import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateCategoryService } from 'src/services/factories/make-create-category'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
    })

    const { name, } = createBodySchema.parse(
        request.body,
    )
    const createCategoryService = makeCreateCategoryService()

    await createCategoryService.execute({
        name,
    })

    return reply.status(201).send()
}