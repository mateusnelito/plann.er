import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import HttpStatusCodes from './utils/HttpStatusCodes';
import zodTypeProvider from './plugins/zod';
import swaggerDocs from './plugins/swagger';
import routes from './routes';

// Instantiate the server
const server = fastify();

// Configure cors plugin
server.register(fastifyCors, {
  origin: '*', // allows any origin
});

// Register the plugins
server.register(zodTypeProvider);
server.register(swaggerDocs);

// Register all the routes to API
server.register(routes);

// Define the 404 route
server.setNotFoundHandler((request, reply) => {
  return reply.code(HttpStatusCodes.NOT_FOUND).send({
    statusCode: HttpStatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});

const SERVER_PORT = Number(process.env.SERVER_PORT || 8000);

// Initiate the server
server
  .listen({ port: SERVER_PORT })
  .then(() => {
    console.log(`🔥 API Running on :${SERVER_PORT}`);
  })
  .catch((err) => {
    console.error(`🛑 Error starting API: \n ${err}`);
    process.exit(1);
  });
