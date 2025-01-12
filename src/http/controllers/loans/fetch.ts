import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchLoansService } from 'src/services/factories/make-fetch-loans'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchLoansQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchLoansQuerySchema.parse(request.params)
  const fetchloansService = makeFetchLoansService()

  const { loans } = await fetchloansService.execute({
    page,
  })

  return reply.status(200).send({
    loans,
  })
}
