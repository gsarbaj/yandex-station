export const publicRoutes = [
    "/",
    "/midi",
    "/station-gen2",
    "/max",
    "/mini",
    "/mini-nowatch",
    "/lite",
    "/order",
    `/^\\/order\\/.*$/`,
    "/order/.*"
]

export const authRoutes = [
    "/auth/login",
]

/**
 * Docs
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Docs
 * @param Hello
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin"