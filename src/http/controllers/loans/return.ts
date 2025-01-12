import { FastifyReply, FastifyRequest } from 'fastify'
import { makeReturnProductsService } from 'src/services/factories/make-return-products'
import { z } from 'zod'

export async function returnProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const returnBodySchema = z.object({
    loanId: z.string().uuid(),
    products: z.array(
      z.object({
        id: z.string().uuid(),
        returnQuantity: z.number(),
      }),
    ),
  })

  const { loanId, products } = returnBodySchema.parse(request.body)
  const returnProductsService = makeReturnProductsService()

  await returnProductsService.execute({
    loanId,
    products,
  })

  return reply.status(204).send()
}
