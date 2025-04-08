import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long.' })
    .max(50, { message: 'First name must be at most 50 characters long.' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long.' })
    .max(50, { message: 'Last name must be at most 50 characters long.' }),

  phoneNumber: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
    message: 'Invalid phone number format.',
  }),

  email: z.string().email({ message: 'Invalid email address.' }),

  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters long.' })
    .max(100, { message: 'Subject must be at most 100 characters long.' }),

  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(1000, { message: 'Message must be at most 1000 characters long.' }),
});

export type Contact = z.infer<typeof contactSchema>;
