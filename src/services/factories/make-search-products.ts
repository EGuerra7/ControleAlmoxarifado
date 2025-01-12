import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { SearchProductsService } from '../search-products'

export function makeSearchProductsService() {
  const productRepository = new PrismaProductRepostitory()
  const service = new SearchProductsService(productRepository)

  return service
}
