import { ServiceResponse } from "@/core/ServiceApi";
import { status } from "@/core/StatusCodes";
import DrizzleBaseRepository from "@/database/adapters/Drizzle/DrizzleRepository";

export default class TestRepository extends DrizzleBaseRepository {
	async createTest() {
		try {
			const createData = {};

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"Test created",
				createData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async retrieveTest() {
		try {
			const retrieveData = {};

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"Test retrieved",
				retrieveData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async updateTest() {
		try {
		} catch (error) {}
	}

	async deleteTest() {
		try {
		} catch (error) {}
	}
}
