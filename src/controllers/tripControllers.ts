import { FastifyReply, FastifyRequest } from 'fastify';
import { postTripType } from '../schemas/tripSchemas';
import HttpStatusCodes from '../utils/HttpStatusCodes';

export async function createTrip(
  request: FastifyRequest<{ Body: postTripType }>,
  reply: FastifyReply
) {
  const { destination, startsAt, endsAt } = request.body;

  return reply
    .status(HttpStatusCodes.CREATED)
    .send({ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' });
}
