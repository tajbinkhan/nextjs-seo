// lib/fetchWrapper.ts

type FetchOptions = Omit<RequestInit, "body"> & {
	body?: any; // Flexibility for FormData, JSON, etc.
	timeout?: number; // Timeout support
};

type Interceptor = (config: FetchOptions) => FetchOptions;

class FetchWrapper {
	private requestInterceptors: Interceptor[] = [];
	private responseInterceptors: Interceptor[] = [];
	private baseURL: string = "";

	constructor(baseURL: string = "") {
		this.baseURL = baseURL;
	}

	addRequestInterceptor(interceptor: Interceptor) {
		this.requestInterceptors.push(interceptor);
	}

	addResponseInterceptor(interceptor: Interceptor) {
		this.responseInterceptors.push(interceptor);
	}

	async request(url: string, options: FetchOptions = {}) {
		let fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url}`;
		let config = { ...options };

		// Apply request interceptors
		for (const interceptor of this.requestInterceptors) {
			config = interceptor(config);
		}

		// Handle timeouts
		const controller = new AbortController();
		if (config.timeout) {
			setTimeout(() => controller.abort(), config.timeout);
		}
		config.signal = controller.signal;

		// Handle JSON body unless it's FormData
		if (config.body && !(config.body instanceof FormData)) {
			config.headers = {
				"Content-Type": "application/json",
				...config.headers
			};
			config.body = JSON.stringify(config.body);
		}

		try {
			const response = await fetch(fullUrl, config);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			let result = response;
			for (const interceptor of this.responseInterceptors) {
				result = interceptor(result) as unknown as Response;
			}

			if (result.headers.get("content-type")?.includes("application/json")) {
				return await result.json();
			}

			return result;
		} catch (error) {
			throw new Error(`Fetch error: ${(error as Error).message}`);
		}
	}

	get(url: string, options?: FetchOptions) {
		return this.request(url, { ...options, method: "GET" });
	}

	post(url: string, body: any, options?: FetchOptions) {
		return this.request(url, { ...options, method: "POST", body });
	}

	put(url: string, body: any, options?: FetchOptions) {
		return this.request(url, { ...options, method: "PUT", body });
	}

	delete(url: string, options?: FetchOptions) {
		return this.request(url, { ...options, method: "DELETE" });
	}
}

// Export the fetchWrapper with the base URL
export const apiRoutePrefix = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const fetchApi = new FetchWrapper(apiRoutePrefix);

export default fetchApi;
