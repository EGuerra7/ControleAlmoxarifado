import fastify from 'fastify'
import cors from '@fastify/cors'
import { adminRoutes } from './http/controllers/userAdmin/routes'
import { productRoutes } from './http/controllers/products/routes'
import { loanRoutes } from './http/controllers/loans/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(adminRoutes)
app.register(productRoutes)
app.register(loanRoutes)
