import type { registerSchema } from "../schemas/userRegister.schema.js";
import type { z } from "zod";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { verifyUserEmail } from "../utils/sendEmail.js";
import type { RegisterForSavingWithOtpSchema } from "../schemas/RegisterForSavingWithOtp.schema.js";
import type { Types } from "mongoose";
import { generateAccessToken } from "../jwt/accessToken.js";
import { generateRefreshToken } from "../jwt/refreshToken.js";
import { setValueInRedis } from "../utils/redis.js";

// user registration service
interface RegistrationInterface extends z.infer<typeof registerSchema> { }

interface RegisterForSavingWithOtpInterface
    extends z.infer<typeof RegisterForSavingWithOtpSchema> { }

export const userRegisterService = async (
    userData: RegistrationInterface
): Promise<string> => {
    try {
        const { username, firstname, lastname, email, password } = userData;

        const isUsernameExists = await UserModel.findOne({ username });
        if (isUsernameExists) throw new Error("Username already exists");

        const isEmailExists = await UserModel.findOne({ email });
        if (isEmailExists) throw new Error("Email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const generateOtp = Math.floor(100000 + Math.random() * 900000);

        const otpExpireDate = new Date(Date.now() + 10 * 60 * 1000);

        const user: RegisterForSavingWithOtpInterface = {
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            otp: generateOtp.toString(),
            otpExpires: otpExpireDate,
        };

        verifyUserEmail(email, generateOtp.toString());

        const newUser: any = await UserModel.create(user);

        const userId: string = (
            newUser._id as unknown as Types.ObjectId
        ).toString();

        return userId;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// verify user
const verifyOtp = async (user: any, otp: string): Promise<boolean> => {
    const isOtpValid: boolean = user.otp === otp && user.otpExpires > new Date();

    if (isOtpValid) {
        return true;
    }
    return false;
};
export const verifyUserEmailService = async (
    userId: string,
    otp: string
): Promise<boolean> => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error("User does not exists, please register first.");
        }
        if (!user.otp || user.isVerified) {
            throw new Error("You are already verified.");
        }
        const isOtpValid: boolean = await verifyOtp(user, otp);

        if (isOtpValid) {
            // OTP is valid and not expired
            user.isVerified = true;
            user.otp = "";
            user.otpExpires = new Date(Date.now());

            await user.save();
            return true;
        }
        return false;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// user login service
interface LoginInterface {
    emailOrUsername: string;
    password: string;
}
export const userLoginWithEmailService = async (loginData: LoginInterface) => {
    try {
        // Basic regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(loginData.emailOrUsername);

        if (isEmail) {
            const user = await UserModel.findOne({
                email: loginData.emailOrUsername,
            }).select("+password");
            if (!user) throw new Error("Incorrect email or user not registered.");

            const checkPassword = await bcrypt.compare(
                loginData.password,
                user.password
            );

            if (!checkPassword) throw new Error("Incorrect password");

            if (!user.isVerified) throw new Error("Please verify your email.")

            const userId: string = (
                user._id as unknown as Types.ObjectId
            ).toString();

            // Convert user document to a plain object and delete unnecessary fields 
            const userObj = user.toObject() as any; 
            delete userObj.password; 
            delete userObj.otp; 
            delete userObj.otpExpires;

            const userInRedis = JSON.stringify(userObj);

            await setValueInRedis(userId, userInRedis, 60 * 60 * 24 * 7)

            const accessToken = await generateAccessToken(userId);
            const refreshToken = await generateRefreshToken(userId);

            const data = { userObj, accessToken, refreshToken };

            return data;
        } else {
            const user = await UserModel.findOne({
                username: loginData.emailOrUsername,
            }).select("+password").select("-otp").select("-otpExpires");
            if (!user) throw new Error("Incorrent username or user not registered.");

            const checkPassword = await bcrypt.compare(
                loginData.password,
                user.password
            );

            if (!checkPassword) throw new Error("Incorrect password");

            if (!user.isVerified) throw new Error("Please verify your email.");

            const userId: string = (
                user._id as unknown as Types.ObjectId
            ).toString();

            // Convert user document to a plain object and delete unnecessary fields 
            const userObj = user.toObject() as any; 
            delete userObj.password; 
            delete userObj.otp; 
            delete userObj.otpExpires;

            const userInRedis = JSON.stringify(userObj);

            await setValueInRedis(userId, userInRedis, 60 * 60 * 24 * 7)

            const accessToken = await generateAccessToken(userId);
            const refreshToken = await generateRefreshToken(userId);

            const data = { userObj, accessToken, refreshToken };

            return data;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};
