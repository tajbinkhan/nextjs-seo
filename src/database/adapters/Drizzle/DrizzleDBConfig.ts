import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./DrizzleSchema";

const sql = neon(process.env.AUTH_DRIZZLE_URL);
const db = drizzle(sql, { schema });

export default db;
