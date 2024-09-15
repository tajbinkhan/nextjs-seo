import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import fetchApi from "@/lib/fetch-config";

import { apiRoute } from "@/routes/routes";
import { LoginFormSchema } from "@/validators/LoginForm.schema";

const config = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true
		}),
		Credentials({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "Email" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password"
				}
			},
			async authorize(credentials) {
				const validateFields = LoginFormSchema.safeParse(credentials);

				if (!validateFields.success) {
					throw new Error(validateFields.error.errors[0].message);
				}

				let user = null;

				await fetchApi
					.post(apiRoute.public.userValidation, validateFields.data)
					.then(res => {
						user = res.data;
					})
					.catch(() => {
						console.log("Error: Login Failed");
					});

				return user;
			}
		})
	]
};

export default config;
