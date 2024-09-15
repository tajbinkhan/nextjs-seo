import { NextRequest, NextResponse } from "next/server";

import { ApiController, ApiCrudController } from "@/core/ApiController";
import { ServiceResponse } from "@/core/ServiceApi";
import TestRepository from "@/modules/Test/Repositories/TestRepository";

export default class TestController extends ApiController implements ApiCrudController {
	protected testRepo: TestRepository;
	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: NextRequest, response: NextResponse) {
		super(request, response);
		this.testRepo = new TestRepository();
	}

	async index() {
		try {
			const response = await this.testRepo.retrieveTest();

			return ServiceResponse.sendResponse(response);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}

	async create() {
		try {
			const response = await this.testRepo.createTest();

			return ServiceResponse.sendResponse(response);
		} catch (error: any) {
			return ServiceResponse.sendResponse(error);
		}
	}

	async show(id: number | string) {
		console.log("ID: ", id);
		throw new Error("Method not implemented.");
	}

	async update(id: number | string) {
		console.log("ID: ", id);
		throw new Error("Method not implemented.");
	}

	async delete(id: number | string) {
		console.log("ID: ", id);
		throw new Error("Method not implemented.");
	}
}
