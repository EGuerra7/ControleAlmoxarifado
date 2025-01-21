import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { search } from './search'
import { edit } from './edit'
import { getAll } from './getAll'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products/search', search)
  app.get('/products', fetch)
  app.get('/products/all', getAll)

  app.put('/products', edit)

  app.post('/products', create)
}
