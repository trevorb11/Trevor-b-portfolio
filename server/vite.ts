import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import type { IStorage } from "./storage";
import { resolvePage, renderMetadata } from "./seo";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server, storage: IStorage) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const metadata = await resolvePage(req.path, storage);
      const page = await vite.transformIndexHtml(url, renderMetadata(template, metadata));
      res.status(metadata.noindex ? 404 : 200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express, storage: IStorage, buildDirectory?: string) {
  const distPath = buildDirectory || path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) throw new Error("Build directory missing; run npm run build.");
  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf8");
  app.use(express.static(distPath, { index: false, redirect: false, setHeaders(res, file) {
    if (file.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    else res.setHeader("Cache-Control", "public, max-age=3600");
  }}));
  app.get("*", async (req, res, next) => {
    if (!["GET", "HEAD"].includes(req.method)) return res.sendStatus(405);
    try {
      const metadata = await resolvePage(req.path, storage);
      if (metadata.noindex) res.set("X-Robots-Tag", "noindex, follow");
      res.status(metadata.noindex ? 404 : 200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).send(renderMetadata(template, metadata));
    } catch (error) { next(error); }
  });
}
