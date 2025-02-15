import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { ZodError } from 'zod';
import BadRequest from '../utils/BadRequest';
import HttpStatusCodes from '../utils/HttpStatusCodes';
import formatZodErrors from '../utils/formatZodErrors';

// Create a plugin to handle global errors
async function errorHandler(server: FastifyInstance) {
  server.setErrorHandler((err, _request, reply) => {
    // Check if is a zod error
    if (err instanceof ZodError) {
      return reply.status(HttpStatusCodes.BAD_REQUEST).send({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Dados inválidos',
        errors: formatZodErrors(err), // Chama a função para formatar os erros
      });
    }

    // Check if is a BadRequest Class error
    if (err instanceof BadRequest) {
      // use the sendErrors method of BadRequest Class Error
      return err.sendErrors(reply);
    }

    console.error(err); // Show debug error

    // TODO: Add a handler error for bad json format

    // If isn't the errors above
    return reply.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal server error!',
      // FIXME: Remove the line after dev mode finish
      errors: err,
    });
  });
}

// Export the fn as fastify plugin
export default fastifyPlugin(errorHandler);
