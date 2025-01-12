import { ProductRepository } from './../repositories/product-repository'
import { LoanProductsRepository } from './../repositories/loan-products-repository'
import { Loan } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'
import { ResourseNotFoundError } from './errors/resource-not-find-error'
import { InsufficientStockError } from './errors/insufficient-stock-error'

interface CreateLoanServiceRequest {
  responsible: string
  products: {
    id: string
    loan_quantity: number
    return_quantity: number
  }[]
}

interface CreateLoanServiceResponse {
  loan: Loan
}

export class CreateLoanService {
  constructor(
    private loanRepository: LoanRepository,
    private loanProductsRepository: LoanProductsRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({
    responsible,
    products,
  }: CreateLoanServiceRequest): Promise<CreateLoanServiceResponse> {
    const loan = await this.loanRepository.create({
      responsible,
      state: 'LOAN',
      created_at: new Date(),
    })

    for (let i = 0; i < products.length; i++) {
      const product = await this.productRepository.findById(products[i].id)

      if (!product) {
        throw new ResourseNotFoundError()
      }

      if (product.quantity < products[i].loan_quantity) {
        throw new InsufficientStockError()
      }

      const newQuantity = product.quantity - products[i].loan_quantity

      this.productRepository.updateQuantity(product.id, newQuantity)

      await this.loanProductsRepository.create({
        loan_id: loan.id,
        product_id: products[i].id,
        loan_quantity: products[i].loan_quantity,
        return_quantity: products[i].return_quantity,
      })
    }

    return { loan }
  }
}
