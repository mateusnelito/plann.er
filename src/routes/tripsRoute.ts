import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createTrip } from '../controllers/tripControllers';
import { POST_TRIP_SCHEMA } from '../schemas/tripSchemas';

const tripsRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Create trip route
  server.withTypeProvider<ZodTypeProvider>().post('/', {
    schema: POST_TRIP_SCHEMA,
    handler: createTrip,
  });
};

export default tripsRoute;
