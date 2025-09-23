import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DATABASE_URL;

if (!DB) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = neon(DB);
