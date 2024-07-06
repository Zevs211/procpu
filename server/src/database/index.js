const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env;
const config = {
  host: env.DB_HOST,
  user: env.DB_USER,
  port: env.DB_PORT,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
};

let client = null;
let newDbClient = null;

const checkDatabaseExists = async (client, dbName) => {
  try {
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname=$1`, [dbName]);
    return res.rowCount > 0;
  } catch (error) {
    console.error(`Error checking if database "${dbName}" exists:`, error);
    throw error;
  }
};

const connect = async () => {
  try {
    client = new Client(config);
    await client.connect();

    const dbExists = await checkDatabaseExists(client, env.DB_NAME);
    if (!dbExists) {
      await client.query(`CREATE DATABASE ${env.DB_NAME}`);
      console.log(`Database "${env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${env.DB_NAME}" already exists.`);
    }

    if (!newDbClient) {
      config.database = env.DB_NAME;
      newDbClient = new Client(config);
      await newDbClient.connect();
      console.log(`Connected to database "${env.DB_NAME}".`);
    }
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

const disconnect = async () => {
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

const stop = async () => {
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

module.exports = { connect, disconnect };