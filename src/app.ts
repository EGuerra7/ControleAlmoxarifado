import fastify from 'fastify'
import { adminRoutes } from './http/controllers/userAdmin/routes'
import { productRoutes } from './http/controllers/products/routes'
import { loanRoutes } from './http/controllers/loans/routes'

export const app = fastify()

app.register(adminRoutes)
app.register(productRoutes)
app.register(loanRoutes)
