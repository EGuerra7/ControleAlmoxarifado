import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetAllProductService } from 'src/services/factories/make-get-all-products'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const getAllProductService = makeGetAllProductService()

  const { products } = await getAllProductService.execute()

  return reply.status(200).send({
    products,
  })
}
