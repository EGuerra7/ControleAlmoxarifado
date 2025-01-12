import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'

export async function adminRoutes(app: FastifyInstance) {
  app.post('/admin', create)
  app.post('/authenticate', authenticate)
}
