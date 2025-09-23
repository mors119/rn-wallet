import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
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

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    // DECIMAL(10, 2): 정수 8개 소수점 이하 2개 총 10개의 숫자

    console.log('Datebase initialized successfully');
  } catch (error) {
    console.log('Error initializing DB', error);
    process.exit(1); // status code 1 means failure, 0 success
  }
}

app.get('/', (req, res) => {
  res.send("it's working");
});

app.use('/api/transactions', transactionRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is up and running on PORT: ', PORT);
  });
});
