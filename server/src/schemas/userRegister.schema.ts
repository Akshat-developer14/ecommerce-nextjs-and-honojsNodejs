import { z } from 'zod';

const commonPasswords = ["password", "123456", "qwerty", "abc123", "letmein"];

export const registerSchema = z.object({

  //username
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  //first name
  firstname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).regex(/^[a-zA-Z0-9_]{3,20}$/, {message: "Invalid username."}),

  //last name
  lastname: z.string().optional(),

  //email
  email: z.string().email({
    message: "Invalid email address.",
  }),

  //password
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character (@$!%*?&#)" })
    .regex(/^(?!.*(.)\1{2}).*$/, { message: "Password must not contain consecutive repeating characters" })
    .refine((password) => !commonPasswords.includes(password), { message: "Password is too common" }),

})

