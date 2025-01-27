import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { sendEmail } from "./resendEmail.js";

// Creating __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// verify user email
export const verifyUserEmail = async (email: string, otp: string) => {
    const templatePath = join(__dirname, '../emails/registrationEmail.ejs');
    const template = readFileSync(templatePath, 'utf-8');

    const emailTemplate = ejs.render(template, { otp });

    sendEmail(email, "Verify Your Email", emailTemplate);
};
