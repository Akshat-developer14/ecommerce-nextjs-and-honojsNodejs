import { decode, sign, verify } from "hono/jwt";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import { getValueFromRedis } from "../utils/redis.js";

dotenv.config();

export const generateRefreshToken = async (userId: string) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Token expires in 7 days
    };
    const secret = process.env.JWT_SECRET_FOR_REFRESH_TOKEN as string;
    const token = await sign(payload, secret);
    return token;
};

export const verifyRefreshToken = async (refreshToken: string) => {
    try {
        const tokenToVerify = refreshToken;
        const secretKey = process.env.JWT_SECRET_FOR_REFRESH_TOKEN as string;

        const decodedPayload = await verify(tokenToVerify, secretKey) as any;

        if (!decodedPayload) {
            throw new Error("Invalid token");
        }

        const isTokenExpired = decodedPayload.exp < Date.now() / 1000;

        if (isTokenExpired) {
            throw new Error("Token has expired");
        }

        const userId = decodedPayload.sub;
        if (!userId) {
            throw new Error("Invalid token");
        }

        //find user first in redis
        const userInString = await getValueFromRedis(userId.toString());
        if (userInString) {
            const user = JSON.parse(userInString);
            return { userId, user};
        } else {

            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            const isUserVerified = user.isVerified;
            if (!isUserVerified) {
                throw new Error("Email is not verified");
            }

            return { userId, user };
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
};
