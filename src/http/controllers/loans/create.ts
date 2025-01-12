import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateLoanService } from 'src/services/factories/make-create-loan'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    responsible: z.string(),
    products: z.array(
      z.object({
        id: z.string().uuid(),
        loan_quantity: z.number().positive(),
        return_quantity: z.number().nonnegative(),
      }),
    ),
  })

  const { responsible, products } = createBodySchema.parse(request.body)
  const createLoanService = makeCreateLoanService()

  await createLoanService.execute({
    responsible,
    products,
  })

  return reply.status(201).send()
}
