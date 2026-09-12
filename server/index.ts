import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { migrateDatabase } from "./migrate";
import { storage } from "./storage";
import { registerSeoRoutes, canonicalRedirect } from "./seo";
import { getDatabasePool } from "./db";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1); // Replit's HTTPS reverse proxy.
app.use((req, res, next) => {
  res.set({ "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin", "X-Frame-Options": "SAMEORIGIN" });
  if (req.secure) res.set("Strict-Transport-Security", "max-age=31536000");
  if (req.path.startsWith("/api/") || req.path.startsWith("/admin")) res.set("X-Robots-Tag", "noindex, nofollow");
  next();
});
app.use(canonicalRedirect);
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: false, limit: "64kb" }));
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    if (req.path.startsWith("/api")) log(`${req.method} ${req.path} ${res.statusCode} in ${Date.now() - start}ms`);
  });
  next();
});

async function start() {
  await migrateDatabase();
  registerSeoRoutes(app, storage);
  const server = await registerRoutes(app);
  if (app.get("env") === "development") await setupVite(app, server, storage);
  else serveStatic(app, storage);
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    const code = Number(err.status || err.statusCode);
    const status = Number.isInteger(code) && code >= 400 && code < 600 ? code : 500;
    console.error(`Request failed (${status}).`);
    res.status(status).set("Cache-Control", "no-store").json({ message: status >= 500 ? "Internal Server Error" : "Invalid request" });
  });
  const port = Number(process.env.PORT) || 5000;
  server.listen({ port, host: process.env.HOST || "0.0.0.0" }, () => log(`serving on port ${port}`));
  let shuttingDown = false;
  const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;
    server.close(async () => { await getDatabasePool().end(); process.exit(0); });
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
start().catch(() => {
  console.error("Startup failed. Verify database connectivity and migration status. No temporary storage fallback was used.");
  process.exit(1);
});
