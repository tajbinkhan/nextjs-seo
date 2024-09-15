import { NextRequest, NextResponse } from "next/server";

import ServiceResponse from "@/core/ServiceApi";
import TestController from "@/modules/Test/Controllers/TestController";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return new TestController(request, response).index();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (request: NextRequest, response: NextResponse) => {
	try {
		return new TestController(request, response).create();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};
