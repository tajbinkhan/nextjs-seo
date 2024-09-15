import type { Config } from "drizzle-kit";

const connectionString = process.env.AUTH_DRIZZLE_URL;
const schemaPath = "./src/database/adapters/Drizzle/DrizzleSchema.ts";
const migrationPath = "./.drizzle/migrations/";

export default {
	dialect: "postgresql",
	schema: schemaPath,
	out: migrationPath,
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true
} as Config;
