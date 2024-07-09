import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

async function zodTypeProvider(server: FastifyInstance) {
  // Add zod-type-provider as the default validator and serializer compiler
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
}

// Export the function as fastify plugin
export default fastifyPlugin(zodTypeProvider);
