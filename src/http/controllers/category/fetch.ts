import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchCategoryService } from 'src/services/factories/make-fetch-categories'


export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    const fetchCategoryService = makeFetchCategoryService()

    const categories = await fetchCategoryService.execute()

    return reply.status(200).send(categories)
}