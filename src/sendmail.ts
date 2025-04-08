import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import { EmailRejectError } from '@/src/email-reject-error';

dotenv.config();

interface Mail {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

const transporter = createTransport({
  host: process.env.SMTP_HOST || undefined,
  port: parseInt(process.env.SMTP_PORT || '') || undefined,
  secure: false,
  tls: {
    rejectUnauthorized: true,
  },
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(mail: Mail): Promise<void> {
  const info = await transporter.sendMail(mail);

  if (info.rejected && info.rejected.length > 0) {
    throw new EmailRejectError(`Email rejected: ${info.rejected.join(', ')}`);
  }

  console.log(info.messageId);
  console.log(info.rejected);
}
