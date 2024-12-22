import { z } from "zod"

export const loginSchema = z.object({

  //username
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  //email
  email: z.string().email({
    message: "Invalid email address.",
  }),

  //password
  password: z.string(),

  //confirm password
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match", path: ["confirmPassword"], // Path to show the error under confirmPassword });
})
