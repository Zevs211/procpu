import path from 'path';
import fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import routes from './routes';
import { connect, disconnect } from './database';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env;
const PORT = env.NODE_ENV === 'dev' ? Number(env.API_PORT) : 5000;

const app = fastify({ logger: true });

app.register(routes);
app.register(cors);

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '127.0.0.1' });
    await connect();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    await disconnect();
    console.error(`Failed to start server on port ${PORT}.`);
  }
};

start();