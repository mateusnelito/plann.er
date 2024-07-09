import { z } from 'zod';
import { complexBadRequestSchema } from './badRequestSchema';

const tripSchema = z.object({
  id: z
    .string({
      required_error: 'Id é obrigatório.',
      invalid_type_error: 'Tipo inválido.',
    })
    .uuid({ message: 'UUID inválido.' }),

  // TODO: add regex validation
  destination: z
    .string({
      required_error: 'destino é obrigatório.',
      invalid_type_error: 'Tipo inválido.',
    })
    .trim()
    .min(3, { message: 'destino deve possuir mais de 3 caracteres.' })
    .max(50, { message: 'destino deve possuir no máximo 50 caracteres.' }),
  startsAt: z.coerce.date({
    invalid_type_error: 'Tipo inválido.',
    required_error: 'data de inicio é obrigatória.',
  }),
  endsAt: z.coerce.date({
    invalid_type_error: 'Tipo inválido.',
    required_error: 'data de fim é obrigatória.',
  }),
});

export const POST_TRIP_SCHEMA = {
  summary: 'Agenda uma nova viagem',
  tags: ['trips'],
  body: tripSchema.omit({ id: true }),
  response: {
    201: z.object({
      id: z.string().uuid(),
    }),
    400: complexBadRequestSchema,
  },
};

export type postTripType = z.infer<typeof POST_TRIP_SCHEMA.body>;
