import path from 'path';
import { Client, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let client: Client | null = null;
let newDbClient: Client | null = null;

const checkDatabaseExists = async (client: Client, dbName: string): Promise<boolean> => {
  try {
    const res: QueryResult = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [dbName]);

    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`Error checking if database "${dbName}" exists:`, error);
    throw error;
  }
};

const connect = async (): Promise<void> => {
  try {
    client = new Client(config);
    await client.connect();

    const dbExists = await checkDatabaseExists(client, process.env.DB_NAME!);
    if (!dbExists) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    }

    if (!newDbClient) {
      const newConfig = { ...config, database: process.env.DB_NAME };
      newDbClient = new Client(newConfig);
      await newDbClient.connect();
      console.log(`Connected to database "${process.env.DB_NAME}".`);
    }
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

const disconnect = async (): Promise<void> => {
  try {
    if (client) {
      await client.end();
      console.log('Disconnected from primary database.');
    }
    if (newDbClient) {
      await newDbClient.end();
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