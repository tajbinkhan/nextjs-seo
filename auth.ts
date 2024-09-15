import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import config from "@/auth.config";
import db from "@/database/adapters/Drizzle/DrizzleDBConfig";
import { users } from "@/database/adapters/Drizzle/DrizzleSchema";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db),
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
		error: "/login"
	},
	events: {
		async linkAccount() {
			await db.update(users).set({ emailVerified: new Date() });
		}
	},
	...config
});
