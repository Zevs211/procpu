import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  port: Number(process.env.DB_PORT) || 5432,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'database',
};

export default config;