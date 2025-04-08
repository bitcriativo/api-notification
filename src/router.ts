import { Router, Request, Response } from 'express';
import { contactSend } from '@/contact-controller';

const router: Router = Router();

router.get('/status', (_: Request, res: Response): void => {
  res.status(200).send({
    status: '🟢 API está online',
  });
});

router.post('/contact/email/send', contactSend);

export default router;
