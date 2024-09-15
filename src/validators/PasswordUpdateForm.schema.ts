import { z } from "zod";

import { validateNewPassword } from "@/validators/CommonRules";

export const PasswordUpdateSchema = z
	.object({
		newPassword: validateNewPassword,
		confirmPassword: validateNewPassword
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export type PasswordUpdateSchemaType = z.infer<typeof PasswordUpdateSchema>;
