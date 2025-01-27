import { z } from "zod"

export const loginSchema = z.object({

  //username
  emailOrUsername: z.string().min(1, {
    message: "Please enter a valid username or email.",
  }),

  //email
  // email: z.string().email({
  //   message: "Invalid email address.",
  // }),

  //password
  password: z.string(),

})
