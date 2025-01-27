import { z } from 'zod';


export const RegisterForSavingWithOtpSchema = z.object({

  //username
  username: z.string().min(2),

  //first name
  firstname: z.string().min(2),

  //last name
  lastname: z.string().optional(),

  //email
  email: z.string().email(),

  //password
  password: z.string()
    .min(8),

  //otp
  otp: z.string().optional(),

  // otpExpiration
  otpExpires: z.date(),

})

