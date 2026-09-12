import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

export function createDatabasePool(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) throw new Error("DATABASE_URL is required; refusing to use temporary storage.");
  const pool = new pg.Pool({ connectionString, max: 5, connectionTimeoutMillis: 10000, idleTimeoutMillis: 30000 });
  pool.on("error", () => console.error("An idle database connection failed."));
  return pool;
}
let pool: pg.Pool | undefined;
export function getDatabasePool() { return pool ??= createDatabasePool(); }
export function createDatabase(connection = getDatabasePool()) { return drizzle(connection, { schema }); }
export type Database = ReturnType<typeof createDatabase>;
