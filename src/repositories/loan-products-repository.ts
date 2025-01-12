import { LoanProduct, Prisma } from '@prisma/client'

export interface LoanProductsRepository {
  find(loanId: string, productId: string): Promise<LoanProduct | null>
  updateReturnQuantity(
    loanId: string,
    productId: string,
    newReturnQuantity: number,
  ): Promise<LoanProduct | null>
  create(data: Prisma.LoanProductUncheckedCreateInput): Promise<LoanProduct>
}
