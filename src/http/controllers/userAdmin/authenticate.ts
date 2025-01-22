import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateAdminService } from 'src/services/factories/make-authenticate-admin'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    user: z.string(),
    password: z.string(),
  })

  const { user, password } = authenticateBodySchema.parse(request.body)
  const authenticateAdminService = makeAuthenticateAdminService()

  const admin = await authenticateAdminService.execute({
    user,
    password,
  })

  return reply.status(200).send({ admin })
}
