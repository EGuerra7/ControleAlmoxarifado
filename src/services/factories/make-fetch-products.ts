import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { FecthProductsService } from '../fetch-products'

export function makefetchProductService() {
  const productRepository = new PrismaProductRepostitory()
  const service = new FecthProductsService(productRepository)

  return service
}
