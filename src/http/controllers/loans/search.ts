import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchLoansService } from 'src/services/factories/make-search-loans'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchLoansQuerySchema = z.object({
    page: z.coerce.number().default(1),
    responsible: z.string().optional(),
    state: z
      .string()
      .optional()
      .transform((val) =>
        val ? (val.toUpperCase() as 'COMPLETED' | 'LOAN') : undefined,
      ),
  })

  const { page, responsible, state } = searchLoansQuerySchema.parse(request.query)
  const searchLoansService = makeSearchLoansService()

  const { loans, meta } = await searchLoansService.execute({
    page,
    responsible,
    state,
  })

  return reply.status(200).send({
    loans,
    meta
  })
}
