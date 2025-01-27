import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, subject: string, html: any) => {
  const { data, error } = await resend.emails.send({
    from: `${process.env.EMAIL_NAME_FOR_RESEND_EMAIL}`,
    to: email,
    subject: subject,
    html: html,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
