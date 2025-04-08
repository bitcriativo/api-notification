import express from 'express';
import router from '@/src/router';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: ../.env,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
