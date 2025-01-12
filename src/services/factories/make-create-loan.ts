import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { CreateLoanService } from '../create-loan'
import { PrismaLoanProductsRepostitory } from 'src/repositories/prisma/prisma-loan-products-repository'
import { PrismaProductRepostitory } from 'src/repositories/prisma/prisma-product-repository'

export function makeCreateLoanService() {
  const loanRepository = new PrismaLoanRepostitory()
  const loanProductRepository = new PrismaLoanProductsRepostitory()
  const productRepository = new PrismaProductRepostitory()
  const service = new CreateLoanService(
    loanRepository,
    loanProductRepository,
    productRepository,
  )

  return service
}
