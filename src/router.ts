import { Router, Request, Response } from 'express';
import { contactSchema } from '@/src/contact-schema';
import { ZodError } from 'zod';
import { formatZodError } from '@/src/format-zod-error';

const router: Router = Router();

router.get('/status', (_: Request, res: Response): void => {
  res.status(200).send({
    status: '🟢 API está online',
  });
});

router.post('/contact-email', (req: Request, res: Response) => {
  try {
    const contactParsed = contactSchema.parse(req.body);
    return res.status(200).json({ ...contactParsed });
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = formatZodError(error);
      return res.status(400).json({ message: 'Invalid data', errors: formatted });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
