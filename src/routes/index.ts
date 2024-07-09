import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import tripsRoute from './tripsRoute';

// Create a plugin with all the routes as plugins
const routes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.register(tripsRoute, { prefix: '/api/trips' });
};
export default routes;
