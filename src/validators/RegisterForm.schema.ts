import { z } from "zod";

import { TOKEN_TYPE } from "@/database/adapters/Drizzle/DrizzleSchema";
import {
	validateClientNumber,
	validateConfirmPassword,
	validateEmail,
	validatePassword
} from "@/validators/CommonRules";

export const RegisterFormSchema = z
	.object({
		fullName: z
			.string({
				required_error: "Full Name is required",
				invalid_type_error: "Full Name is required"
			})
			.min(1, "Full Name is required"),
		email: validateEmail,
		password: validatePassword,
		confirmPassword: validateConfirmPassword
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export const AccountVerificationSchema = z.object({
	otp: validateClientNumber("OTP"),
	method: z.enum(TOKEN_TYPE.enumValues),
	email: validateEmail
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
