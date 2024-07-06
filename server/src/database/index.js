const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env;
const config = {
  host: env.DB_HOST,
  user: env.DB_USER,
  port: env.DB_PORT,
  password: env.DB_PASSWORD,
};

const client = new Client(config);

const checkDatabaseExists = async (client, dbName) => {
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
  return res.rowCount > 0;
};

module.exports.connect = async () => {
  try {
    await client.connect();
    const dbExists = await checkDatabaseExists(client, env.DB_NAME);
    if (!dbExists) {
      await client.query(`CREATE DATABASE ${env.DB_NAME}`);
      console.log(`Database "${env.DB_NAME}" is created successfully.`);
    } else {
      console.log(`Database "${env.DB_NAME}" already exists.`);
    }
    config.database = env.DB_NAME;
    const newDbClient = new Client(config);
    await newDbClient.connect();
  } catch (error) {
    console.error('Error connecting to PostgreSQL', error);
  }
};
