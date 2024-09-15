import { z } from "zod";

import { validateEmail, validatePassword } from "@/validators/CommonRules";

export const LoginFormSchema = z.object({
	email: validateEmail,
	password: validatePassword
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
