import { z } from "zod";

import { validateEmail, validateString } from "@/validators/CommonRules";

export const ContactFormSchema = z.object({
	name: validateString("Your name"),
	email: validateEmail,
	message: validateString("Message")
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
