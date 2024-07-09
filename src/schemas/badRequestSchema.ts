import { z } from 'zod';

const badRequestSchema = z.object({
  statusCode: z.number().default(400),
  message: z.string(),
});

export const simpleBadRequestSchema = badRequestSchema.extend({
  errors: z.record(z.string(), z.array(z.string())),
});

export const complexBadRequestSchema = simpleBadRequestSchema.or(
  badRequestSchema.extend({
    errors: z.record(z.any()),
  })
);

export type badRequestType = z.infer<typeof badRequestSchema>;
