import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateProductService } from 'src/services/factories/make-create-product'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    quantity: z.number().min(1),
    localization: z.string(),
    category: z.string(),
  })

  const { name, quantity, localization, category } = createBodySchema.parse(
    request.body,
  )
  const createProductService = makeCreateProductService()

  await createProductService.execute({
    name,
    quantity,
    localization,
    category,
  })

  return reply.status(201).send()
}
