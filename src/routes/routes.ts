export const route = {
	public: {
		home: "/"
	},
	private: {
		dashboard: "/dashboard"
	},
	protected: {
		login: "/login",
		register: "/register",
		forgetPassword: "/forget-password"
	}
} as const;

export const apiRoute = {
	public: {
		login: "/auth/login",
		register: "/auth/register",
		passwordReset: "/auth/password-reset",
		passwordResetOTP: "/auth/password-reset/otp",
		accountVerification: "/auth/account-verification",
		userValidation: "/auth/user-validation"
	},
	private: {
		logout: "/auth/logout"
	}
} as const;
