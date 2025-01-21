import { LoanRepository } from 'src/repositories/loan-repository'
import { LoanProductsRepository } from './../repositories/loan-products-repository'
import { Loan } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'
import { ResourseNotFoundError } from './errors/resource-not-find-error'
import { InvalidReturnError } from './errors/invalid-return-error'

interface ReturnProductsServiceRequest {
  loanId: string
  products: {
    id: string
    return_quantity: number
  }[]
}

interface ReturnProductsServiceResponse {
  loan: Loan
}

export class ReturnProductsService {
  constructor(
    private loanProductsRepository: LoanProductsRepository,
    private loanRepository: LoanRepository,
    private productRepository: ProductRepository,
  ) { }

  async execute({
    loanId,
    products,
  }: ReturnProductsServiceRequest): Promise<ReturnProductsServiceResponse> {
    const loan = await this.loanRepository.findById(loanId)

    if (!loan) {
      throw new ResourseNotFoundError()
    }

    if (loan.state === 'COMPLETED') {
      throw new InvalidReturnError()
    }

    for (let i = 0; i < products.length; i++) {
      const product = await this.productRepository.findById(products[i].id)

      if (!product) {
        throw new ResourseNotFoundError()
      }

      const loanProduct = await this.loanProductsRepository.find(
        loanId,
        product.id,
      )

      if (!loanProduct) {
        throw new ResourseNotFoundError()
      }

      if (products[i].return_quantity > loanProduct.loan_quantity) {
        throw new InvalidReturnError()
      }

      await this.loanProductsRepository.updateReturnQuantity(
        loanId,
        product.id,
        products[i].return_quantity,
      )

      const newQuantity = product.quantity + products[i].return_quantity

      await this.productRepository.updateQuantity(product.id, newQuantity)
    }

    await this.loanRepository.updateStatus(loanId, 'COMPLETED')

    return { loan }
  }
}
