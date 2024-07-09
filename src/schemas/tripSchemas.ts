import { z } from 'zod';
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
