import { prisma } from './../../lib/prisma'
import { Prisma, LoanProduct } from '@prisma/client'
import { LoanProductsRepository } from '../loan-products-repository'

export class PrismaLoanProductsRepostitory implements LoanProductsRepository {
  async find(loanId: string, productId: string): Promise<LoanProduct | null> {
    const searchedLoan = await prisma.loanProduct.findFirst({
      where: {
        loan_id: loanId,
        product_id: productId,
      },
    })

    return searchedLoan
  }

  async updateReturnQuantity(
    loanId: string,
    productId: string,
    newReturnQuantity: number,
  ) {
    const updatedLoanProduct = await prisma.loanProduct.update({
      where: {
        product_id_loan_id: { product_id: productId, loan_id: loanId },
      },
      data: {
        return_quantity: newReturnQuantity,
      },
    })

    return updatedLoanProduct
  }

  async create(
    data: Prisma.LoanProductUncheckedCreateInput,
  ): Promise<LoanProduct> {
    const loanProduct = await prisma.loanProduct.create({
      data,
    })

    return loanProduct
  }
}
