import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { EditProductService } from '../edit-product'

export function makeEditProductService() {
  const productRepository = new PrismaProductRepostitory()
  const service = new EditProductService(productRepository)

  return service
}
