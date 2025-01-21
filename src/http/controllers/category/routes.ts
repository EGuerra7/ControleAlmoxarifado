import { FastifyInstance } from "fastify"
import { fetch } from "./fetch"
import { create } from "./create"


export async function categoryRoutes(app: FastifyInstance) {
    app.get('/category', fetch)
    app.post('/category', create)
}