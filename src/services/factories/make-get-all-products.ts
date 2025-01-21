import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { GetAllProductsService } from '../get-all-products'

export function makeGetAllProductService() {
  const productRepository = new PrismaProductRepostitory()
  const service = new GetAllProductsService(productRepository)

  return service
}
