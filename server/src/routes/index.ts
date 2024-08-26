import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply
      .code(200)
      .send({ hello: 'world' });
  });
}

export default routes;