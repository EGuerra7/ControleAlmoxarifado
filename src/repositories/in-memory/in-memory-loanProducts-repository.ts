import { Prisma, LoanProduct } from '@prisma/client'
import { LoanProductsRepository } from '../loan-products-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryLoanProductsRepository implements LoanProductsRepository {
  public loanProducts: LoanProduct[] = []

  async find(loanId: string, productId: string) {
    const loanProduct = this.loanProducts.find(
      (loanProduct) =>
        loanProduct.loan_id === loanId && loanProduct.product_id === productId,
    )

    if (!loanProduct) {
      return null
    }

    return loanProduct
  }

  async updateReturnQuantity(
    loanId: string,
    productId: string,
    newReturnQuantity: number,
  ) {
    const loanProductInIndex = this.loanProducts.findIndex(
      (loanProduct) =>
        loanProduct.loan_id === loanId && loanProduct.product_id === productId,
    )

    if (loanProductInIndex >= 0) {
      this.loanProducts[loanProductInIndex].return_quantity = newReturnQuantity
    }

    return this.loanProducts[loanProductInIndex]
  }

  async create(
    data: Prisma.LoanProductUncheckedCreateInput,
  ): Promise<LoanProduct> {
    const loanProduct = {
      id: randomUUID(),
      product_id: data.product_id,
      loan_id: data.loan_id,
      loan_quantity: data.loan_quantity,
      return_quantity: data.return_quantity!,
    }

    this.loanProducts.push(loanProduct)

    return loanProduct
  }
}
