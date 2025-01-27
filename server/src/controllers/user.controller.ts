import type { Context } from "hono";
import { registerSchema } from "../schemas/userRegister.schema.js";
import type { z } from "zod";
import {
  userLoginWithEmailService,
  userRegisterService,
  verifyUserEmailService,
} from "../services/user.service.js";
import { deleteCookie, setCookie } from "hono/cookie";

// Register User
interface RegistrationInterface extends z.infer<typeof registerSchema> { }
export const userRegistrationController = async (
  c: Context
): Promise<Response> => {
  try {
    const req = c.req;
    const userData: RegistrationInterface = await req.json();

    // data validation first
    try {
      const validatedData = registerSchema.parse(userData);

      if (!validatedData) throw new Error("Invalid data");

      const userId: string = await userRegisterService(userData);

      return c.json(
        { success: true, message: "User registered successfully", userId },
        201
      );
    } catch (error: any) {
      return c.json(
        { success: false, errors: error.message || "user not saved" },
        400
      );
    }
  } catch (error: any) {
    return c.json(
      { success: false, message: error.message || "Something went wrong" },
      500
    );
  }
};

//verify user
interface VerifyUserInterface {
  email: string;
  otp: string;
}
export const verifyUserEmailController = async (
  c: Context
): Promise<Response> => {
  try {
    const id = c.req.param("id");

    const req = c.req;
    const data: VerifyUserInterface = await req.json();

    if (data.otp && id) {
      const isUserVerified = await verifyUserEmailService(id, data.otp);

      if (isUserVerified) {
        return c.json(
          { success: true, message: "User verified successfully" },
          200
        );
      } else {
        return c.json({ success: false, message: "Invalid OTP" }, 400);
      }
    } else {
      return c.json({ success: false, message: "Please provide otp" }, 400);
    }
  } catch (error: any) {
    return c.json(
      { success: false, message: error.message || "Something went wrong" },
      500
    );
  }
};

// user login with email
export const userLoginWithEmailController = async (c: Context) => {
  try {
    const req = c.req;
    const data = await req.json();

    const dataReturned = await userLoginWithEmailService(data);

    setCookie(c, 'accessToken', dataReturned.accessToken, {
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 60 * 5,
      // domain: 'localhost:3000'
    })
    setCookie(c, 'refreshToken', dataReturned.refreshToken, {
      path: '/',
      secure: false,
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7,
      // domain: 'localhost:3000'
    })

    return c.json(
      {
        success: true,
        message: "User logged in successfully",
        data: { user: dataReturned.userObj },
      },
      200
    );
  } catch (error: any) {
    return c.json(
      { success: false, message: error.message || "Something went wrong" },
      500
    );
  }
};

export const userAccountDetailsController = async (c: Context) => {
  try {
    const user = c.get('user');

    if (!user) {
      return c.json({ success: false, message: "Please login" }, 400)
    }

    return c.json({ success: true, data: user }, 200)
  } catch (error: any) {
    return c.json({ success: false, message: error.message || "Something went wrong" }, 500)
  }
}
export const logoutController = async (c: Context) => {
  try {
    deleteCookie(c, 'accessToken')

    deleteCookie(c, 'refreshToken')

    return c.json({ success: true, message: "User logged out successfully" }, 200)
  } catch (error: any) {
    return c.json({success: false, message: error.message || "Something went wrong"}, 500)
  }
}