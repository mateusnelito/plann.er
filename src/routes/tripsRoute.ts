import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import HttpStatusCodes from '../utils/HttpStatusCodes';

const tripsRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Create trip route
  server.withTypeProvider<ZodTypeProvider>().post('/', {
    // schema: {},
    handler: (request: FastifyRequest, reply: FastifyReply) => {
      return reply
        .status(HttpStatusCodes.CREATED)
        .send({ message: 'create trips working' });
    },
  });
};

export default tripsRoute;
