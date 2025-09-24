import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import transactionRoute from './routes/transactionsRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 프록시 뒤(Cloudflare/NGINX/Render/Vercel 등)에서 req.ip를 신뢰하려면:
// app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:8081',
  'http://127.0.0.1:8081',
  // 필요 시 추가: 'http://192.168.x.x:8081', 'http://10.0.2.2:8081' 등
];

app.use(
  cors({
    origin(origin, cb) {
      // 모바일 기기/시뮬레이터에서 올 수 있는 다양한 origin 허용
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.options(
  '*',
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// middleware
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(ratelimiter);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

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
