import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import config from './config';
import { Pool, PoolConfig, QueryResult } from 'pg';

let pool: Pool | null = null;
let newDbPool: Pool | null = null;

const checkDatabaseExists = async (pool: Pool, dbName: string): Promise<boolean> => {
  try {
    const res: QueryResult = await pool.query('SELECT 1 FROM pg_database WHERE datname=$1', [dbName]);
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`Error checking if database "${dbName}" exists:`, error);
    throw error;
  }
};

const connect = async (): Promise<Pool> => {
  try {
    pool = new Pool(config as PoolConfig);
    await pool.connect();

    const dbExists = await checkDatabaseExists(pool, process.env.DB_NAME!);
    if (!dbExists) {
      await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    }

    if (!newDbPool) {
      const newConfig = { ...config, database: process.env.DB_NAME };
      newDbPool = new Pool(newConfig);
      await newDbPool.connect();
      console.log(`Connected to database "${process.env.DB_NAME}".`);
    }

    return newDbPool!;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

const disconnect = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end();
      console.log('Disconnected from primary database.');
    }
    if (newDbPool) {
      await newDbPool.end();
      console.log('Disconnected from new database.');
    }
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
    throw error;
  }
};

const stop = async (): Promise<void> => {
  try {
    await disconnect();
    console.log('Application stopped.');
  } catch (error) {
    console.error('Error stopping application:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing connections...');
  await stop();
  process.exit(0);
});

export default { connect, disconnect };