import { InferSelectModel } from "drizzle-orm";

import {
	LANGUAGE_TYPE,
	ROLE_TYPE,
	STATUS_TYPE,
	TOKEN_TYPE,
	accounts,
	post,
	users,
	verificationTokens
} from "@/database/adapters/Drizzle/DrizzleSchema";

export type UserSchemaType = InferSelectModel<typeof users>;
export type AccountSchemaType = InferSelectModel<typeof accounts>;
export type VerificationTokenSchemaType = InferSelectModel<typeof verificationTokens>;
export type PostSchemaType = InferSelectModel<typeof post>;

/**
 * Enum Schema Types
 */

export type RoleType = (typeof ROLE_TYPE.enumValues)[number];
export type TokenType = (typeof TOKEN_TYPE.enumValues)[number];
export type StatusType = (typeof STATUS_TYPE.enumValues)[number];
export type LanguageType = (typeof LANGUAGE_TYPE.enumValues)[number];
