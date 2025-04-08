import { Request, Response } from 'express';
import { Contact, contactSchema } from '@/contact-schema';
import { sendMail } from '@/sendmail';
import { ZodError } from 'zod';
import { formatZodError } from '@/format-zod-error';
import { EmailRejectError } from '@/email-reject-error';

export async function contactSend(req: Request, res: Response) {
  try {
    const contactParsed: Contact = contactSchema.parse(req.body);

    await sendMail({
      from: 'contato@eapprojetos.com.br',
      to: contactParsed.email,
      subject: contactParsed.subject,
      html: 'Mensagem enviada com Sucesso',
    });

    await sendMail({
      from: 'contato@eapprojetos.com.br',
      to: 'contato@eapprojetos.com.br',
      subject: contactParsed.subject,
      html: contactParsed.message,
    });

    return res.status(200).json({ message: 'Email send successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = formatZodError(error);
      return res.status(400).json({ message: 'Invalid data', errors: formatted });
    }

    if (error instanceof EmailRejectError) {
      return res.status(502).json({ message: 'Failed to send email' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
