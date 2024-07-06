const path = require('path');
const cors = require('@fastify/cors');
const fastify = require('fastify')({ logger: true });
const routes = require('./routes');
const db = require('./database');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const env = process.env;
const PORT = env.NODE_ENV === 'dev' ? env.API_PORT : 5000;

fastify.register(routes);
fastify.register(cors);

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    await db.connect();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();