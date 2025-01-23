import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetLoanByIdService } from 'src/services/factories/make-get-loan-by-id'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getLoanByIdBodySchema = z.object({
    loanId: z.string(),
  })

  const { loanId } = getLoanByIdBodySchema.parse(request.params)
  const getByIdService = makeGetLoanByIdService()

  const { loan } = await getByIdService.execute({ loanId })

  return reply.status(200).send({ loan })
}
