import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateAdminService } from 'src/services/factories/make-create-admin'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    user: z.string(),
    password: z.string(),
  })

  const { user, password } = createBodySchema.parse(request.body)
  const createAdminService = makeCreateAdminService()

  await createAdminService.execute({
    user,
    password,
  })

  return reply.status(201).send()
}
