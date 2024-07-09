import { FastifyReply, FastifyRequest } from 'fastify';
import { postTripType } from '../schemas/tripSchemas';
import HttpStatusCodes from '../utils/HttpStatusCodes';
import dayjs from 'dayjs';
import BadRequest from '../utils/BadRequest';
import { saveTrip } from '../services/tripServices';

export async function createTrip(
  request: FastifyRequest<{ Body: postTripType }>,
  reply: FastifyReply
) {
  const { startsAt, endsAt } = request.body;

  // Checking dates based on business rules
  // Check if the begin of trip is in past
  if (dayjs(startsAt).isBefore(dayjs())) {
    throw new BadRequest({
      statusCode: HttpStatusCodes.BAD_REQUEST,
      message: 'Data de inicio inválida',
      errors: { startsAt: ['A data de inicio deve ser futura.'] },
    });
  }

  // Check if the end of trip is after begin
  if (dayjs(endsAt).isBefore(startsAt)) {
    throw new BadRequest({
      statusCode: HttpStatusCodes.BAD_REQUEST,
      message: 'Data de fim inválida',
      errors: { endsAt: ['A data de fim deve ser superior a de inicio.'] },
    });
  }

  const newTrip = await saveTrip(request.body);
  return reply.status(HttpStatusCodes.CREATED).send({ id: newTrip.id });
}
