import { z } from "zod";

import { validateEmail, validatePassword, validateString } from "@/validators/CommonRules";

export const CreateUserServerSchema = z.object({
	name: validateString("Name"),
	email: validateEmail,
	password: validatePassword,
	image: z.string().or(z.null()).optional()
});

export type CreateUserServerSchemaType = z.infer<typeof CreateUserServerSchema>;
