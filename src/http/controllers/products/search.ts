import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchProductsService } from 'src/services/factories/make-search-products'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchProductQuerySchema = z.object({
    page: z.coerce.number(),
    name: z.string().optional(),
    category: z.string().optional(),
  })

  const { page, name, category } = searchProductQuerySchema.parse(request.query)
  const searchProductService = makeSearchProductsService()

  const { products, meta } = await searchProductService.execute({
    page,
    name,
    category,
  })

  return reply.status(200).send({
    products,
    meta,
  })
}
