import { EnvType } from "@/core/Env";

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
