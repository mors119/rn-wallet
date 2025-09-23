import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DATABASE_URL;

if (!DB) {
  throw new Error('DATABASE_URL is not set');
}

export const sql = neon(DB);

export async function initDB() {
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
