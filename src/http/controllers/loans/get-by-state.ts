import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetLoansByStateService } from 'src/services/factories/make-get-loan-by-state'
import { z } from 'zod'

export async function getByState(request: FastifyRequest, reply: FastifyReply) {
    const fetchLoansQuerySchema = z.object({
        state: z.enum(['LOAN', 'COMPLETED'])
    })

    const { state } = fetchLoansQuerySchema.parse(request.query)
    const getLoansByStateService = makeGetLoansByStateService()

    const { loans } = await getLoansByStateService.execute({
        state,
    })

    return reply.status(200).send({
        loans,
    })
}