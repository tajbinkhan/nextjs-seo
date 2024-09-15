import db from "@/database/adapters/Drizzle/DrizzleDBConfig";

export default abstract class DrizzleBaseRepository {
	protected db: typeof db;

	constructor() {
		this.db = db;
	}
}
