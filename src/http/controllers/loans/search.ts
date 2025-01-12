import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchLoansService } from 'src/services/factories/make-search-loans'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchLoansQuerySchema = z.object({
    responsible: z.string().optional(),
    state: z
      .string()
      .optional()
      .transform((val) =>
        val ? (val.toUpperCase() as 'COMPLETED' | 'LOAN') : undefined,
      ),
  })

  const { responsible, state } = searchLoansQuerySchema.parse(request.query)
  const searchLoansService = makeSearchLoansService()

  const { loans } = await searchLoansService.execute({
    responsible,
    state,
  })

  return reply.status(200).send({
    loans,
  })
}
