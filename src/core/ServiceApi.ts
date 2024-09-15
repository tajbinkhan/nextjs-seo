import { NextResponse } from "next/server";

import { status } from "@/core/StatusCodes";

const noContentStatus = [status.HTTP_204_NO_DATA];

interface Pagination {
	totalItems?: number; // Total number of items
	limit?: number; // Number of items per page
	offset?: number; // Number of items to skip before starting to collect the result set
	currentPage?: number; // The current page number
	prevPage?: number; // The previous page number
	nextPage?: number; // The next page number
	totalPages?: number; // Total number of pages
	hasPrevPage?: boolean; // Whether there is a previous page
	hasNextPage?: boolean; // Whether there is a next page
}

interface ServiceApiResponse<T> {
	status: number; // HTTP status code
	message: string; // Response message
	data?: T; // Response data
	pagination?: Pagination; // Pagination information
}

export class ServiceResponse {
	static createResponse = async <T>(
		status: number,
		message: string,
		data?: T,
		pagination?: Pagination
	) => {
		if (status >= 400) return Promise.reject({ status, message });

		if (noContentStatus.includes(status)) {
			// Handle responses where no content is expected
			return Promise.resolve({ status, message });
		}

		const response = { status, message, data, pagination } as ServiceApiResponse<T>;
		return Promise.resolve(response);
	};

	static createErrorResponse = async (error: any) => {
		console.log("Error: ", error.message);
		if (error.status) return Promise.reject(error);
		return Promise.reject(this.internalServerError());
	};

	static successResponse = (message: string) => {
		return this.createResponse(status.HTTP_200_OK, message);
	};

	static badResponse = (message: string) => {
		return this.createResponse(status.HTTP_400_BAD_REQUEST, message);
	};

	static internalServerError = () => {
		return this.createResponse(status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal server error");
	};

	static sendResponse = <T>({ status, message, data, pagination }: ServiceApiResponse<T>) => {
		if (noContentStatus.includes(status)) {
			return NextResponse.json({}, { status: status });
		}

		return NextResponse.json({ status: status, message, data, pagination }, { status: status });
	};
}
