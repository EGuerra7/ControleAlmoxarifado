import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { search } from './search'
import { returnProduct } from './return'

export async function loanRoutes(app: FastifyInstance) {
  app.get('/loans/search', search)
  app.get('/loans', fetch)

  app.patch('/loans/return', returnProduct)

  app.post('/loans', create)
}
