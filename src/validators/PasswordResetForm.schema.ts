import { z } from "zod";

import { validateEmail, validateNewPassword } from "@/validators/CommonRules";

export const PasswordReset = z.object({
	email: validateEmail
});

export const PasswordResetConfirmationServerSchema = z
	.object({
		newPassword: validateNewPassword,
		confirmPassword: validateNewPassword,
		email: validateEmail
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export type PasswordResetConfirmationServerSchemaType = z.infer<
	typeof PasswordResetConfirmationServerSchema
>;
export type PasswordResetSchemaType = z.infer<typeof PasswordReset>;
