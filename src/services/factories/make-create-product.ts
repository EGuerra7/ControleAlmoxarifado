import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { CreateProductService } from '../create-product'

export function makeCreateProductService() {
  const productRepository = new PrismaProductRepostitory()
  const service = new CreateProductService(productRepository)

  return service
}
