import 'tsconfig-paths/register';
import express from 'express';
import router from '@/router';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({
  path: '../.env',
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*'],
  }),
);

app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
