import type { Express, Request, Response, NextFunction } from "express";
import { publicPages, missingPage, sectionRedirects, type PageMetadata } from "@shared/page-metadata";
import type { IStorage } from "./storage";

export function siteOrigin(value = process.env.SITE_URL || "https://trevorbosetti.com") {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw new Error("SITE_URL must be an HTTPS origin without a path or credentials.");
  return url.origin;
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
export async function resolvePage(path: string, storage: IStorage): Promise<PageMetadata> {
  const known = publicPages.find(p => p.path === path);
  if (known) return known;
  const projectMatch = /^\/projects\/([1-9]\d*)$/.exec(path);
  if (projectMatch) {
    const project = await storage.getProjectById(Number(projectMatch[1]));
    if (project) return { path, title: `${project.title} | Trevor Bosetti`, description: project.description };
  }
  const blogMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (blogMatch) {
    const post = await storage.getBlogPostBySlug(decodeURIComponent(blogMatch[1]));
    if (post) return { path, title: `${post.title} | Trevor Bosetti`, description: post.excerpt, type: "article" };
  }
  return missingPage(path);
}
export function renderMetadata(template: string, metadata: PageMetadata, origin = siteOrigin()) {
  const canonical = new URL(metadata.path, origin).href;
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const tags = `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta name="robots" content="${metadata.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
    <meta property="og:site_name" content="Trevor Bosetti" />
    <meta property="og:type" content="${metadata.type || "website"}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${origin}/about-photo.webp" />
    <meta property="og:image:alt" content="Trevor Bosetti" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${origin}/about-photo.webp" />`;
  return template.replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\s[^>]*(?:name=["'](?:description|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
    .replace(/<link\s[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace("</head>", `${tags}\n  </head>`);
}
export function robotsText(origin = siteOrigin()) {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${origin}/sitemap.xml\n`;
}
export async function sitemapXml(storage: IStorage, origin = siteOrigin()) {
  const [projects, posts] = await Promise.all([storage.getProjects(), storage.getBlogPosts()]);
  const paths = new Set([...publicPages.map(p => p.path), ...projects.map(p => `/projects/${p.id}`), ...posts.map(p => `/blog/${encodeURIComponent(p.slug)}`)]);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...paths].map(path => `  <url><loc>${escapeHtml(new URL(path, origin).href)}</loc></url>`).join("\n")}\n</urlset>\n`;
}
export function registerSeoRoutes(app: Express, storage: IStorage) {
  app.get("/robots.txt", (_req, res) => res.type("text/plain").send(robotsText()));
  app.get("/sitemap.xml", async (_req, res, next) => {
    try { res.type("application/xml").set("Cache-Control", "public, max-age=300").send(await sitemapXml(storage)); }
    catch (error) { next(error); }
  });
  app.get("/api/page-metadata", async (req, res, next) => {
    try {
      const path = typeof req.query.path === "string" ? req.query.path : "/";
      if (!path.startsWith("/") || path.startsWith("//") || path.length > 2048 || /[?#]/.test(path)) return res.status(400).json({ error: "Invalid page path" });
      const metadata = await resolvePage(path, storage);
      res.set("Cache-Control", "no-store").json({ ...metadata, origin: siteOrigin() });
    } catch (error) { next(error); }
  });
}
export function canonicalRedirect(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  if (path.startsWith("//")) return res.status(400).send("Invalid path");
  // Host redirection is opt-in only after DNS is verified, preventing a loop with legacy forwarding.
  if (process.env.CANONICAL_REDIRECT === "true" && ["GET", "HEAD"].includes(req.method)) {
    const canonical = new URL(siteOrigin());
    const host = req.hostname.toLowerCase();
    if (["trevorbosetti.replit.app", "www.trevorbosetti.com", canonical.hostname].includes(host) && (host !== canonical.hostname || req.protocol !== "https")) {
      return res.redirect(308, `${canonical.origin}${req.originalUrl}`);
    }
  }
  if (["GET", "HEAD"].includes(req.method) && !path.startsWith("/api/")) {
    if (path === "/index.html") return res.redirect(308, "/");
    if (path.length > 1 && path.endsWith("/")) return res.redirect(308, path.replace(/\/+$/, "") + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
    if (sectionRedirects[path]) return res.redirect(308, sectionRedirects[path]);
  }
  next();
}
