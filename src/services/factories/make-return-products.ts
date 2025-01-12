import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { PrismaLoanProductsRepostitory } from 'src/repositories/prisma/prisma-loan-products-repository'
import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'
import { ReturnProductsService } from '../return-products'

export function makeReturnProductsService() {
  const loanRepository = new PrismaLoanRepostitory()
  const loanProductRepository = new PrismaLoanProductsRepostitory()
  const productRepository = new PrismaProductRepostitory()
  const service = new ReturnProductsService(
    loanProductRepository,
    loanRepository,
    productRepository,
  )

  return service
}
