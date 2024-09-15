import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const ROLE_TYPE = {
	ADMIN: "ADMIN",
	EDITOR: "EDITOR",
	CONTRIBUTOR: "CONTRIBUTOR",
	MODERATOR: "MODERATOR",
	VISITOR: "VISITOR",
	enumValues: ["ADMIN", "EDITOR", "CONTRIBUTOR", "MODERATOR", "VISITOR"]
} as const;

export const TOKEN_TYPE = {
	EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
	PASSWORD_RESET: "PASSWORD_RESET",
	enumValues: ["EMAIL_VERIFICATION", "PASSWORD_RESET"]
} as const;

export const STATUS_TYPE = {
	PUBLISHED: "PUBLISHED",
	DRAFT: "DRAFT",
	enumValues: ["PUBLISHED", "DRAFT"]
} as const;

export const LANGUAGE_TYPE = {
	ENGLISH: "en",
	ARABIC: "ar",
	enumValues: ["en", "ar"]
} as const;

export const ROLE_TYPE_ENUM = pgEnum("role_type", ROLE_TYPE.enumValues);

export const TOKEN_TYPE_ENUM = pgEnum("token_type", TOKEN_TYPE.enumValues);

export const STATUS_TYPE_ENUM = pgEnum("status_type", STATUS_TYPE.enumValues);

export const LANGUAGE_TYPE_ENUM = pgEnum("language_type", LANGUAGE_TYPE.enumValues);

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique().notNull(),
	password: text("password"),
	role: ROLE_TYPE_ENUM("role_type").notNull().default("VISITOR"),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image")
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state")
	},
	account => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull()
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		tokenType: TOKEN_TYPE_ENUM("token_type").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull()
	},
	verificationToken => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	})
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports")
	},
	authenticator => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID]
		})
	})
);

export const post = pgTable("post", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	slug: text("slug").unique().notNull(),
	status: STATUS_TYPE_ENUM("status_type").notNull().default("DRAFT"),
	authorId: text("author_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const postLocale = pgTable("post_locale", {
	postId: integer("post_id")
		.notNull()
		.references(() => post.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	content: text("content").notNull(),
	authorId: text("author_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
});

/**
 * All the relations between tables
 * are defined here. This is used to
 * generate the SQL schema.
 */

// author_relation
export const authorRelation = relations(users, ({ one, many }) => ({
	post: many(post),
	postLocale: many(postLocale),
	account: one(accounts, { fields: [users.id], references: [accounts.userId] })
}));

// post_relation
export const postRelation = relations(post, ({ one, many }) => ({
	postLocale: many(postLocale),
	author: one(users, { fields: [post.authorId], references: [users.id] })
}));

// post_locale_relation
export const postLocaleRelation = relations(postLocale, ({ one }) => ({
	post: one(post, { fields: [postLocale.postId], references: [post.id] }),
	author: one(users, { fields: [postLocale.authorId], references: [users.id] })
}));
