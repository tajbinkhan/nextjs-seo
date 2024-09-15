import { NextRequest, NextResponse } from "next/server";

type QueryParamsProxy = {
	[key: string]: string | null;
};

export abstract class ApiController {
	protected request: NextRequest;
	protected response: NextResponse;
	protected searchParams: QueryParamsProxy;

	protected constructor(req: NextRequest, res: NextResponse) {
		this.request = req;
		this.response = res;

		this.searchParams = this.getQueryParam(req);
	}

	async getReqBody() {
		return await this.request.json();
	}

	async getReqFormData() {
		return await this.request.formData();
	}

	getQueryParam(request: NextRequest): QueryParamsProxy {
		const queryParams = request.nextUrl.searchParams;
		const handler = {
			get: function (_: URLSearchParams, prop: string) {
				return queryParams.get(prop) || null;
			}
		};
		return new Proxy(queryParams, handler) as unknown as QueryParamsProxy;
	}
}

export interface ApiCrudController {
	index(): unknown;
	create(): unknown;
	show(id: number | string): unknown;
	update(id: number | string): unknown;
	delete(id: number | string): unknown;
}
