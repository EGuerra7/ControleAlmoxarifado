import { FastifyReply, FastifyRequest } from 'fastify'
import { makeEditProductService } from 'src/services/factories/make-edit-product'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    quantity: z.number().min(1),
    localization: z.string(),
    category: z.string(),
  })

  const { id, name, quantity, localization, category } = editBodySchema.parse(
    request.body,
  )
  const editProductService = makeEditProductService()

  await editProductService.execute({
    id,
    name,
    quantity,
    localization,
    category,
  })

  return reply.status(204).send()
}
