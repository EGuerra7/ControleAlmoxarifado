import { FastifyReply, FastifyRequest } from 'fastify'
import { makefetchProductService } from 'src/services/factories/make-fetch-products'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchProductQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchProductQuerySchema.parse(request.query)
  const fetchProductService = makefetchProductService()

  const { products, meta } = await fetchProductService.execute({
    page,
  })

  return reply.status(200).send({
    products,
    meta,
  })
}
