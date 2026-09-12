# Portfolio technical foundations

## Editing and authentication

Browser administration is retired. `/admin` and `/admin/dashboard` return 404 with noindex; `/api/admin/*` and the old CMS write endpoint return 410. There is no public login, session cookie, seeded account, plaintext password comparison, or fallback session secret. Edit the application through the existing private Replit workspace / `ssh trevor-portfolio` connection. Do not restore the old login components or endpoints.

Legacy database users are retained for schema compatibility but any old plaintext credentials are disabled and erased by the migration. No replacement admin is created. SESSION_SECRET is no longer consumed by this application.

## Persistent data

`DATABASE_URL` is required. Projects, blog posts, CMS values, and the storage interface use PostgreSQL through a bounded connection pool and parameterized Drizzle queries. Startup fails if the database cannot be reached; it never falls back to memory.

`server/migrate.ts` runs at startup and with `npm run db:migrate`. Schema changes and initial public-content seeding run in one transaction with an advisory lock to coordinate simultaneous starts. The seed preserves the existing 28 public CMS values, 10 project IDs, and 5 blog slugs. It runs once, skips conflicts, and never resets subsequent edits. The CMS `(section,key)` pair has a real database uniqueness constraint. Legacy tables are retained rather than dropped.

Use reviewed migrations for future schema changes. `npm run db:push` deliberately aliases the safe migration command; do not run an unreviewed `drizzle-kit push` against this database. The legacy user and unique_section_key tables are not active application models.

Replit has separate development and production databases. SSH's normal DATABASE_URL addresses development. Publishing runs the same additive migration against the deployment's DATABASE_URL. Keep “Copy your development database to production database” unchecked; that option replaces production data.

## Content operations over SSH

From `/home/runner/workspace`:

```
npm run content -- list
npm run content -- export /tmp/portfolio-content-review.json
npm run content -- update-cms /tmp/portfolio-content-change.json
```

Export refuses to overwrite an existing file and excludes contacts and credentials. `update-cms` accepts a JSON object with `id`, `expectedValue`, and `value`. It checks the expected previous text, writes a backup outside the served project, and uses an atomic compare-and-update query to reject concurrent changes.

These commands use the DATABASE_URL of the shell in which they run. Development content edits are not copied into production merely by republishing. To maintain live content, use a shell securely configured for the production database or stage an explicit reviewed data migration. Never paste connection strings into chat, commit them, or put them in browser URLs.

The database CMS fields currently feed the integrations, AI expertise, and AI creative showcase sections. Hero/about copy and static case studies remain in React source. Updating a legacy CMS key that no component reads will not change the page. Project/blog CRUD methods are available in `DatabaseStorage` for reviewed maintenance scripts; no public write routes are exposed.

The inquiry endpoint remains unavailable and returns 503; persistent storage alone is not email delivery. The public contact section uses direct email.

## Crawl and domain behavior

- `/robots.txt` returns plain text allowing public crawling, excluding admin/API routes, and pointing to `/sitemap.xml`.
- `/sitemap.xml` returns XML with valid canonical public pages, current project IDs, and blog slugs. Admin routes, section aliases, unknown pages, and tracking parameters are excluded.
- The initial HTML has a unique escaped title, description, canonical URL, robots tag, and social metadata for each supported page. SPA navigation refreshes the same metadata.
- Missing pages and unknown records return HTTP 404 with noindex. Missing API endpoints return JSON 404. `/about`, `/projects`, and `/contact` permanently redirect to the appropriate homepage section.
- `SITE_URL` defaults to `https://trevorbosetti.com`. It must be an HTTPS origin. `CANONICAL_REDIRECT=true` redirects the known Replit/www hostnames to the canonical hostname, preserving paths and queries. Leave that flag off until custom-domain DNS and TLS are verified to avoid a loop with the old SiteGround forwarding.
- The app has no public authentication cookies. It sets nosniff, a referrer policy, same-origin framing, and HSTS on HTTPS responses. Replit's proxy is trusted for one hop.

Domain connection must be completed at the authoritative DNS host; code cannot fix old SiteGround DNS. Replit's Domains screen provided these records on 2026-09-11:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 34.111.179.208 |
| TXT | @ | replit-verify=d20d0ce1-a82a-4287-9b1f-5bdd1260fc0a |

The existing apex/www A record was 35.202.115.95 and authoritative nameservers were ns1.siteground.net and ns2.siteground.net. Preserve MX, mail host, SPF, DKIM, and other unrelated records. `www` requires its own Replit domain entry and the records shown there. Keep verification TXT records permanently for certificate renewal. Check public TLS and deep links before enabling canonical host redirects.

## Verification and maintenance

```
npm run check
npm test
npm run build
npm audit --omit=dev
```

Database integration tests create a uniquely named `portfolio_test_*` schema and remove only that schema afterward. They cover repeatable migrations, persisted edits, unique keys, legacy credential retirement, project/blog storage, contact defaults, actual HTTP metadata/statuses, XML/plain-text crawl routes, and disabled public writes. The suite requires DATABASE_URL for integration coverage and reports a skip if it is missing.

Runtime packages were patched, including Drizzle 0.45.2. The unused OpenAI client and old session/auth libraries were removed. A scoped qs override selects the patched 6.16.x line until Express's dependency range includes it. Review that override on future Express upgrades. A zero runtime advisory count is a dependency scan result, not a penetration-test guarantee.

Replit showed seven-day point-in-time recovery enabled for the production database. Keep deployment history and periodic content exports; test restoration when backup or hosting arrangements change.
