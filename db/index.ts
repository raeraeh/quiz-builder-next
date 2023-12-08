import {drizzle, BetterSQLite3Database} from "drizzle-orm/better-sqlite3";
import * as schema from './schema';
import {migrate} from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const sqlite = new Database("sqlite.db");
export const db: BetterSQLite3Database = drizzle(sqlite);

migrate(db, {migrationsFolder: "db/migrations"});
