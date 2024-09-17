
import { Pool } from 'pg';

export const upsert = async (pool: Pool): Promise<void> => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Users table created.');
  } catch (err) {
    console.error('Error in migration:', err);
    throw err;
  }
};
