import path from 'path';
import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';
import config from './config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

let pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!pool) {
    pool = new Pool(config);
  }
  return pool;
};

const checkDatabaseExists = async (dbName: string): Promise<boolean> => {
  const pool = getPool();
  try {
    const res: QueryResult = await pool.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`Error checking if database "${dbName}" exists:`, error);
    throw error;
  }
};

const createDatabase = async (dbName: string): Promise<void> => {
  const pool = getPool();
  try {
    await pool.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database "${dbName}" created successfully.`);
  } catch (error) {
    console.error(`Error creating database "${dbName}":`, error);
    throw error;
  }
};

const connectToDatabase = async (dbName: string): Promise<Pool> => {
  try {
    if (pool) {
      await pool.end();
    }

    pool = new Pool({ ...config, database: dbName });
    await pool.connect();
    console.log(`Connected to database "${dbName}".`);

    return pool;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    throw error;
  }
};

export const connect = async (): Promise<Pool> => {
  const dbName = process.env.DB_NAME!;

  try {
    const dbExists = await checkDatabaseExists(dbName);

    if (!dbExists) {
      await createDatabase(dbName);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }

    return await connectToDatabase(dbName);
  } catch (error) {
    console.error('Error during connection process:', error);
    throw error;
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end();
      console.log('Disconnected from database.');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
    throw error;
  }
};

export default { connect, disconnect };