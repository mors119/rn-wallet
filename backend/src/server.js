import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';

import transactionRoute from './routes/transactionsRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 프록시 뒤(Cloudflare/NGINX/Render/Vercel 등)에서 req.ip를 신뢰하려면:
// app.set('trust proxy', 1);

// middleware
app.use(ratelimiter);
app.use(express.json());

// custom simple middleware
// app.use((req, res, next) => {
//   console.log('Hey we hit a req, the method is', req.method);
//   next();
// });

app.use('/api/transactions', transactionRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is up and running on PORT: ', PORT);
  });
});
