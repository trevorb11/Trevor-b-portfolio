import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { createDatabase, getDatabasePool } from "../server/db";
import { DatabaseStorage } from "../server/storage";
import { migrateDatabase } from "../server/migrate";
import { cmsContents } from "../shared/schema";

const [command, argument] = process.argv.slice(2);
const storage = new DatabaseStorage();
try {
  await migrateDatabase();
  if (command === "list") {
    console.table((await storage.getCmsContents()).map(({ id, section, key }) => ({ id, section, key })));
  } else if (command === "export" && argument) {
    const data = { exportedAt: new Date().toISOString(), cms: await storage.getCmsContents(), projects: await storage.getProjects(), posts: await storage.getBlogPosts() };
    await writeFile(resolve(argument), JSON.stringify(data, null, 2) + "\n", { mode: 0o600, flag: "wx" });
    console.log(`Public content exported to ${resolve(argument)}. Login credentials and contact records are excluded.`);
  } else if (command === "update-cms" && argument) {
    const input = z.object({ id: z.number().int().positive(), expectedValue: z.string(), value: z.string().max(50000) }).strict().parse(JSON.parse(await readFile(argument, "utf8")));
    const original = await storage.getCmsContent(input.id);
    if (!original || original.value !== input.expectedValue) throw new Error("Content changed or does not exist. Export it again before editing.");
    const backupDir = resolve(homedir(), ".local/share/trevor-portfolio/content-backups");
    await mkdir(backupDir, { recursive: true, mode: 0o700 });
    const backup = resolve(backupDir, `cms-${input.id}-${Date.now()}.json`);
    await writeFile(backup, JSON.stringify(original, null, 2) + "\n", { flag: "wx", mode: 0o600 });
    const updated = await createDatabase().update(cmsContents).set({ value: input.value, updatedAt: new Date() }).where(and(eq(cmsContents.id, input.id), eq(cmsContents.value, input.expectedValue))).returning({ id: cmsContents.id });
    if (!updated.length) throw new Error("A concurrent edit was detected; nothing was overwritten.");
    console.log(`CMS item ${input.id} saved. Previous value backed up to ${backup}.`);
  } else {
    console.log("Usage: npm run content -- list | export NEW_FILE.json | update-cms CHANGE.json");
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof z.ZodError ? "Invalid change file." : error instanceof Error && !('code' in error) ? error.message : "Content operation failed; check database access.");
  process.exitCode = 1;
} finally { await getDatabasePool().end(); }
