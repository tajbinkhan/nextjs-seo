import { InferSelectModel } from "drizzle-orm";

import {
	LANGUAGE_TYPE,
	ROLE_TYPE,
	STATUS_TYPE,
	TOKEN_TYPE,
	accounts,
	category,
	certification,
	homePageContent,
	job,
	media,
	ourPartners,
	ourTeam,
	post,
	service,
	tag,
	testimonial,
	users,
	verificationTokens
} from "@/database/adapters/Drizzle/DrizzleSchema";

export type UserSchemaType = InferSelectModel<typeof users>;
export type AccountSchemaType = InferSelectModel<typeof accounts>;
export type VerificationTokenSchemaType = InferSelectModel<typeof verificationTokens>;
export type MediaSchemaType = InferSelectModel<typeof media>;
export type PostSchemaType = InferSelectModel<typeof post>;
export type CategorySchemaType = InferSelectModel<typeof category>;
export type TagSchemaType = InferSelectModel<typeof tag>;
export type ServiceSchemaType = InferSelectModel<typeof service>;
export type JobSchemaType = InferSelectModel<typeof job>;
export type OurTeamSchemaType = InferSelectModel<typeof ourTeam>;
export type OurPartnersSchemaType = InferSelectModel<typeof ourPartners>;
export type TestimonialSchemaType = InferSelectModel<typeof testimonial>;
export type CertificationSchemaType = InferSelectModel<typeof certification>;
export type HomePageContentSchemaType = InferSelectModel<typeof homePageContent>;

/**
 * Enum Schema Types
 */

export type RoleType = (typeof ROLE_TYPE.enumValues)[number];
export type TokenType = (typeof TOKEN_TYPE.enumValues)[number];
export type StatusType = (typeof STATUS_TYPE.enumValues)[number];
export type LanguageType = (typeof LANGUAGE_TYPE.enumValues)[number];
