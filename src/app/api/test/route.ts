import { NextRequest, NextResponse } from "next/server";

import { ServiceResponse } from "@/core/ServiceApi";
import TestController from "@/modules/Test/Controllers/TestController";

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		return new TestController(req, res).index();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		return new TestController(req, res).create();
	} catch (error: any) {
		return ServiceResponse.internalServerError();
	}
};
