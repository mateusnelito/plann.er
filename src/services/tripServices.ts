import { prisma } from '../lib/prisma';
import { postTripType } from '../schemas/tripSchemas';

export async function saveTrip(data: postTripType) {
  return await prisma.trip.create({ data });
}
