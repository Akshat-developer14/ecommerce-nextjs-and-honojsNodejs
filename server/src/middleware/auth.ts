import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { generateAccessToken, verifyAccessToken } from "../jwt/accessToken.js";
import { verifyRefreshToken } from "../jwt/refreshToken.js";

// check wheather is loggedin or not
export const isAuthenticated = async (c: Context, next: Next) => {
    try {
        const accessToken: string | undefined = getCookie(c, "accessToken");

        // checking for access token
        if (!accessToken) {
            const refreshToken = getCookie(c, "refreshToken");

            // checking for refresh token
            if (!refreshToken) {
                return c.json({ success: false, message: "Please login" }, 400);
            }

            // regenerate access token using refresh token
            const { userId, user } = await verifyRefreshToken(refreshToken);

            if (!user || !userId) {
                throw new Error("User not found");
            }
            const accessToken = await generateAccessToken(userId);

            setCookie(c, "accessToken", accessToken, {
                path: "/",
                secure: false,
                httpOnly: true,
                sameSite: "Lax",
                maxAge: 60 * 5,
                // domain: 'localhost:3000'
            });
            c.set("user", user);

            await next();

            return;
        }

        // if access token available
        const user = await verifyAccessToken(accessToken);

        if (!user) {
            throw new Error("Please login");
        }

        c.set("user", user);

        await next();
    } catch (error: any) {
        return c.json(
            { success: false, message: error.message || "Something went wrong" },
            400
        );
    }
};
