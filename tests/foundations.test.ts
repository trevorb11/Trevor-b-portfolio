import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import pg from "pg";
import express from "express";
import { createDatabase, createDatabasePool } from "../server/db";
import { migrateDatabase } from "../server/migrate";
import { DatabaseStorage } from "../server/storage";
import { registerRoutes } from "../server/routes";
import { serveStatic } from "../server/vite";
import { canonicalRedirect, registerSeoRoutes, renderMetadata, resolvePage, robotsText, siteOrigin, sitemapXml } from "../server/seo";
import { publicPages } from "../shared/page-metadata";

const template = '<html><head><title>Old</title><meta name="description" content="Old"><meta property="og:title" content="Old"></head><body><div id="root"></div></body></html>';
test("Metadata is escaped and replaces old tags exactly once", () => {
  const html = renderMetadata(template, { path: "/example", title: 'Title </title><script>bad()</script>', description: 'Text " onload="bad()' }, "https://trevorbosetti.com");
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert.ok(!html.includes("<script>bad()"));
  assert.ok(html.includes('href="https://trevorbosetti.com/example"'));
  assert.ok(html.includes("&quot; onload=&quot;"));
});
test("Canonical origin rejects insecure and path-bearing configuration", () => {
  assert.equal(siteOrigin("https://trevorbosetti.com/"), "https://trevorbosetti.com");
  for (const value of ["http://example.com", "https://example.com/path", "https://user:pass@example.com", "https://example.com/?query=1"]) assert.throws(() => siteOrigin(value));
  assert.match(robotsText(), /User-agent: \*\nAllow: \/\n/);
  assert.doesNotMatch(robotsText(), /Disallow: \/\n/);
});
test("Database is required instead of silently falling back to memory", () => {
  assert.throws(() => createDatabasePool(""), /DATABASE_URL is required/);
});

test("Persistent content, safe migration, retired admin, and crawl routes", { skip: !process.env.DATABASE_URL }, async t => {
  const schema = `portfolio_test_${randomUUID().replace(/-/g, "")}`;
  const owner = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  await owner.query(`CREATE SCHEMA ${schema}`);
  const newPool = () => new pg.Pool({ connectionString: process.env.DATABASE_URL, options: `-c search_path=${schema}` });
  let pool = newPool();
  const directory = await mkdtemp(path.join(tmpdir(), "portfolio-static-test-"));
  let server: Awaited<ReturnType<typeof registerRoutes>> | undefined;
  try {
    await migrateDatabase(pool);
    let storage = new DatabaseStorage(createDatabase(pool));
    const first = (await storage.getCmsContents())[0];
    const initialCounts = { cms: (await storage.getCmsContents()).length, projects: (await storage.getProjects()).length, posts: (await storage.getBlogPosts()).length };
    await t.test("Seed content preserves public IDs, and has no default users", async () => {
      assert.deepEqual(initialCounts, { cms: 28, projects: 10, posts: 5 });
      assert.equal((await storage.getProjectById(1))?.id, 1);
      assert.equal((await pool.query("SELECT count(*)::int AS count FROM users")).rows[0].count, 0);
    });
    await t.test("Changes survive a fresh connection and repeated migrations", async () => {
      await storage.updateCmsContent(first.id, "Isolated durability test");
      await pool.end();
      pool = newPool();
      storage = new DatabaseStorage(createDatabase(pool));
      await migrateDatabase(pool);
      assert.equal((await storage.getCmsContent(first.id))?.value, "Isolated durability test");
      assert.equal((await storage.getProjects()).length, initialCounts.projects);
      assert.equal((await storage.getBlogPosts()).length, initialCounts.posts);
    });
    await t.test("A database constraint prevents duplicate CMS keys", async () => {
      await assert.rejects(storage.createCmsContent({ section: first.section, key: first.key, value: "duplicate", type: "text" }));
      assert.equal((await storage.getCmsContents()).length, initialCounts.cms);
    });
    await t.test("Legacy plaintext users are disabled and cleared, without creating replacements", async () => {
      await pool.query("INSERT INTO users(username,password,is_admin) VALUES ($1,$2,true)", ["isolated-legacy-user", "test-only-unsafe-credential"]);
      await migrateDatabase(pool);
      const { rows } = await pool.query("SELECT password,is_admin,auth_version FROM users");
      assert.equal(rows[0].is_admin, false);
      assert.equal(rows[0].password, "!disabled-legacy-credential!");
      assert.equal(rows[0].auth_version, 2);
      await migrateDatabase(pool);
      assert.equal((await pool.query("SELECT auth_version FROM users")).rows[0].auth_version, 2);
    });
    await t.test("Storage supports persisted project/blog changes and contact defaults", async () => {
      const p = await storage.createProject({ title: "Test", description: "Test", category: "test", image: "/test.webp", technologies: [] });
      assert.ok(p.id > 10);
      await storage.updateProject(p.id, { description: "Changed" });
      assert.equal((await storage.getProjectById(p.id))?.description, "Changed");
      await storage.deleteProject(p.id);
      const post = await storage.createBlogPost({ title: "Test", excerpt: "Test", content: "Test", category: "test", image: "/test.webp", slug: "isolated-test" });
      await storage.updateBlogPost(post.id, { excerpt: "Changed" });
      assert.equal((await storage.getBlogPostBySlug("isolated-test"))?.excerpt, "Changed");
      await storage.deleteBlogPost(post.id);
      const contact = await storage.createContact({ name: "Test", email: "test@example.invalid", subject: "Test", message: "Isolated test" });
      assert.equal(contact.phone, null);
      assert.equal(contact.marketingConsent, false);
    });
    await t.test("Sitemap includes valid canonical pages and excludes admin and redirects", async () => {
      const xml = await sitemapXml(storage);
      assert.match(xml, /^<\?xml version="1.0"/);
      assert.equal((xml.match(/<url>/g) || []).length, publicPages.length + 15);
      assert.ok(!xml.includes("/admin") && !xml.includes("replit.app") && !xml.includes("/#"));
      assert.equal((await resolvePage("/blog/missing", storage)).noindex, true);
      assert.equal((await resolvePage("/projects/1", storage)).noindex, undefined);
    });
    await writeFile(path.join(directory, "index.html"), template);
    const app = express();
    app.set("trust proxy", 1);
    app.use(canonicalRedirect);
    app.use(express.json({ limit: "64kb" }));
    registerSeoRoutes(app, storage);
    server = await registerRoutes(app, storage);
    serveStatic(app, storage, directory);
    app.use((_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => res.status(400).json({ error: "Invalid request" }));
    await new Promise<void>(resolve => server!.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const base = `http://127.0.0.1:${address.port}`;
    await t.test("All public routes have one correct title and canonical; unknown routes return 404", async () => {
      for (const page of publicPages) {
        const res = await fetch(base + page.path);
        assert.equal(res.status, 200, page.path);
        const html = await res.text();
        assert.equal((html.match(/<title>/g) || []).length, 1, page.path);
        assert.ok(html.includes(`href="https://trevorbosetti.com${page.path}"`), page.path);
      }
      for (const route of ["/missing-page", "/case-study/missing", "/projects/99999", "/blog/missing", "/admin", "/admin/dashboard"]) {
        const res = await fetch(base + route);
        assert.equal(res.status, 404, route);
        assert.match(res.headers.get("x-robots-tag")!, /noindex/);
      }
      const project = await fetch(base + "/projects/1");
      assert.match(await project.text(), /Impact Wrapped for Community Food Share/);
      assert.equal((await fetch(base + "/api/missing")).status, 404);
      assert.equal((await fetch(base + "/api/projects/1junk")).status, 400);
    });
    await t.test("Crawl endpoints return the right types; section aliases redirect", async () => {
      const robots = await fetch(base + "/robots.txt");
      assert.match(robots.headers.get("content-type")!, /text\/plain/);
      assert.match(await robots.text(), /Sitemap: https:\/\/trevorbosetti.com\/sitemap.xml/);
      const sitemap = await fetch(base + "/sitemap.xml");
      assert.match(sitemap.headers.get("content-type")!, /application\/xml/);
      assert.ok(!(await sitemap.text()).includes("<html"));
      assert.equal((await fetch(base + "/contact", { redirect: "manual" })).headers.get("location"), "/#contact");
      assert.equal((await fetch(base + "/blog/", { redirect: "manual" })).headers.get("location"), "/blog");
      const meta = await fetch(base + "/api/page-metadata?path=%2Fprojects%2F1");
      assert.equal((await meta.json()).path, "/projects/1");
    });
    await t.test("Retired login and CMS writes cannot create a session or modify content", async () => {
      for (const route of ["/api/admin/login", "/api/admin/logout", "/api/admin/check-auth", "/api/cms/update"]) {
        const res = await fetch(base + route, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "any-password", id: first.id, value: "Unauthorized" }) });
        assert.equal(res.status, 410);
        assert.equal(res.headers.get("set-cookie"), null);
      }
      assert.equal((await storage.getCmsContent(first.id))?.value, "Isolated durability test");
    });
    await t.test("Contact endpoint does not falsely acknowledge or store delivery; malformed JSON is contained", async () => {
      const before = (await storage.getContacts()).length;
      const data = { name: "Test User", email: "test@example.invalid", subject: "Audit test", message: "Isolated test. Never sent." };
      const response = await fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      assert.equal(response.status, 503);
      assert.equal((await storage.getContacts()).length, before);
      const invalid = await fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
      assert.equal(invalid.status, 400);
      assert.equal((await fetch(base + "/api/projects/1")).status, 200);
    });
  } finally {
    if (server?.listening) await new Promise<void>((resolve, reject) => server!.close(error => error ? reject(error) : resolve()));
    await pool.end();
    // This schema is generated above exclusively for this test; never a user schema.
    await owner.query(`DROP SCHEMA ${schema} CASCADE`);
    await owner.end();
    await rm(directory, { recursive: true, force: true });
  }
});
