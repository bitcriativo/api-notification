import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/status', (_: Request, res: Response): void => {
  res.status(200).send({
    status: '🟢 API está online',
  });
});

export default router;
