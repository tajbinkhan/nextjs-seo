import { apiRoutePrefix } from "@/lib/fetch-config";

import { apiRoute, route } from "@/routes/routes";

// Helper function to convert route patterns to regular expressions
function routeToRegex(route: string): RegExp {
	return new RegExp("^" + route.replace(/\{.*?\}/g, "([^/]+)") + "$");
}

// Function to check if a path matches any route in a given array
function matchRoute(path: string, routes: string[]): boolean {
	return routes.some(route => routeToRegex(route).test(path));
}

const [publicRoutes, privateRoutes, protectedRoutes] = Object.values(route).map(obj =>
	Object.values(obj).map((value: any) => (typeof value === "function" ? value("{id}") : value))
);

const [publicApiRoutes, privateApiRoutes] = Object.values(apiRoute).map(obj =>
	Object.values(obj)
) as unknown as string[];

const apiAuthPrefix = `${apiRoutePrefix}/auth`;

const DEFAULT_HOMEPAGE = "/";
const DEFAULT_LOGIN_URL = "/login";
const DEFAULT_LOGIN_REDIRECT = "/dashboard";

const appRoutePrefix = process.env.NEXT_FRONTEND_URL;

export {
	apiAuthPrefix,
	appRoutePrefix,
	DEFAULT_HOMEPAGE,
	DEFAULT_LOGIN_REDIRECT,
	DEFAULT_LOGIN_URL,
	matchRoute,
	privateApiRoutes,
	privateRoutes,
	protectedRoutes,
	publicApiRoutes,
	publicRoutes
};
