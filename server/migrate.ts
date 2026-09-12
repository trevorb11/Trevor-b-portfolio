import type pg from "pg";
import seed from "./seed-content.json";
import { getDatabasePool } from "./db";

// Additive and transactional: startup never resets existing content.
export async function migrateDatabase(pool: pg.Pool = getDatabasePool()) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(176548231, 1)");
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, username text NOT NULL UNIQUE, password text NOT NULL, is_admin boolean DEFAULT false);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_version integer NOT NULL DEFAULT 1;
      CREATE TABLE IF NOT EXISTS projects (id serial PRIMARY KEY, title varchar(255) NOT NULL, description text NOT NULL, category varchar(50) NOT NULL, image text NOT NULL, technologies text[] NOT NULL, link text, featured integer DEFAULT 0);
      CREATE TABLE IF NOT EXISTS blog_posts (id serial PRIMARY KEY, title varchar(255) NOT NULL, excerpt text NOT NULL, content text NOT NULL, category varchar(50) NOT NULL, image text NOT NULL, published_date timestamp NOT NULL DEFAULT now(), slug varchar(255) NOT NULL UNIQUE);
      CREATE TABLE IF NOT EXISTS contacts (id serial PRIMARY KEY, name varchar(100) NOT NULL, email varchar(255) NOT NULL, phone varchar(20), subject varchar(255) NOT NULL, message text NOT NULL, marketing_consent boolean DEFAULT false, created_at timestamp NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS cms_contents (id serial PRIMARY KEY, section varchar(100) NOT NULL, key varchar(100) NOT NULL, value text NOT NULL, type varchar(50) NOT NULL, updated_at timestamp NOT NULL DEFAULT now());
      CREATE UNIQUE INDEX IF NOT EXISTS cms_contents_section_key_unique ON cms_contents(section, key);
    `);
    const seeded = await client.query("SELECT name FROM portfolio_migrations WHERE name = $1", ["public_content_v1"]);
    if (!seeded.rowCount) {
      for (const x of seed.cms) await client.query("INSERT INTO cms_contents (id,section,key,value,type,updated_at) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING", [x.id,x.section,x.key,x.value,x.type,x.updatedAt]);
      for (const x of seed.projects) await client.query("INSERT INTO projects (id,title,description,category,image,technologies,link,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING", [x.id,x.title,x.description,x.category,x.image,x.technologies,x.link,x.featured]);
      for (const x of seed.posts) await client.query("INSERT INTO blog_posts (id,title,excerpt,content,category,image,published_date,slug) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING", [x.id,x.title,x.excerpt,x.content,x.category,x.image,x.publishedDate,x.slug]);
      for (const table of ["cms_contents", "projects", "blog_posts"]) {
        await client.query(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), GREATEST(COALESCE((SELECT MAX(id) FROM ${table}), 1), (SELECT last_value FROM ${table}_id_seq)), true)`);
      }
      await client.query("INSERT INTO portfolio_migrations (name) VALUES ($1)", ["public_content_v1"]);
    }
    // Never preserve a usable plaintext/default password from an older installation.
    await client.query("UPDATE users SET password = '!disabled-legacy-credential!', is_admin = false, auth_version = auth_version + 1 WHERE password NOT LIKE 'scrypt$%' AND password <> '!disabled-legacy-credential!'");
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
