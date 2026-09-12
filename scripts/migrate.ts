import { migrateDatabase } from "../server/migrate";
import { getDatabasePool } from "../server/db";
try {
  await migrateDatabase();
  console.log("Database migrations complete. Existing content was preserved.");
} catch {
  console.error("Migration failed. No changes were committed. Check database connectivity and schema conflicts.");
  process.exitCode = 1;
} finally { await getDatabasePool().end(); }
