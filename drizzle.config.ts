import type {Config} from "drizzle-kit";

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    driver: "better-sqlite",
    dbCredentials: {
        url: "sqlite.db"
    },
    verbose: true,
    // Always ask for my confirmation
    strict: true,
} satisfies Config;