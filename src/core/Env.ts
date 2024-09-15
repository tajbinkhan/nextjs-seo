import { z } from "zod";

const emailEnvSchema = z.object({
	EMAIL_SERVER_HOST: z.string().min(1),
	EMAIL_SERVER_PORT: z.string().min(1),
	EMAIL_SERVER_USER: z.string().min(1),
	EMAIL_SERVER_PASSWORD: z.string().min(1),
	EMAIL_FROM: z.string().min(1)
});

export const authEnvSchema = z.object({
	AUTH_DRIZZLE_URL: z.string().min(1),
	AUTH_SECRET: z.string().min(1),
	AUTH_TRUST_HOST: z.string().min(1),
	AUTH_GOOGLE_ID: z.string().min(1),
	AUTH_GOOGLE_SECRET: z.string().min(1),
	AUTH_URL: z.string().min(1)
});

export const envSchema = z.object({
	// AuthJS
	...authEnvSchema.shape,
	// Email Config
	...emailEnvSchema.shape,
	// URLs
	NEXT_PUBLIC_BASE_URL: z.string().min(1),
	NEXT_FRONTEND_URL: z.string().min(1),
	NEXT_PUBLIC_BACKEND_API_URL: z.string().min(1),
	CALLBACK_URL_COOKIE_NAME: z.string().min(1)
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	throw new Error(Env.error.errors[0].message);
} else {
	console.log("/*** Env loaded successfully ***/");
}

export type EnvType = z.infer<typeof envSchema>;
