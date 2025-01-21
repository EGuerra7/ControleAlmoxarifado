import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'
import { InMemoryLoanProductsRepository } from 'src/repositories/in-memory/in-memory-loanProducts-repository'
import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { ReturnProductsService } from './return-products'
import { InvalidReturnError } from './errors/invalid-return-error'

let loanRepository: InMemoryLoanRepository
let loanProductsRepository: InMemoryLoanProductsRepository
let productRepository: InMemoryProductRepository
let sut: ReturnProductsService

describe('Return Products Service', () => {
  beforeEach(async () => {
    loanRepository = new InMemoryLoanRepository()
    loanProductsRepository = new InMemoryLoanProductsRepository()
    productRepository = new InMemoryProductRepository()
    sut = new ReturnProductsService(
      loanProductsRepository,
      loanRepository,
      productRepository,
    )

    /* Creating the products */
    await productRepository.create({
      id: '1',
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    await productRepository.create({
      id: '2',
      name: 'Eraser',
      quantity: 5,
      localization: 'On the first cabinet, in the second shelf',
      category: 'Stationery',
    })

    /* Creating the loan */
    await loanRepository.create({
      id: '1',
      responsible: 'Erick Guerra',
      state: 'LOAN',
      created_at: new Date(),
    })

    /* Creating the loanProducts */
    await loanProductsRepository.create({
      loan_id: '1',
      product_id: '1',
      loan_quantity: 3,
      return_quantity: 0,
    })

    await loanProductsRepository.create({
      loan_id: '1',
      product_id: '2',
      loan_quantity: 2,
      return_quantity: 0,
    })
  })

  it('should be able to return products', async () => {
    const { loan } = await sut.execute({
      loanId: '1',
      products: [
        {
          id: '1',
          return_quantity: 1,
        },
        {
          id: '2',
          return_quantity: 2,
        },
      ],
    })

    expect(loan.state).toEqual('COMPLETED')

    const storedLoansProducts = loanProductsRepository.loanProducts

    expect(storedLoansProducts).toEqual([
      expect.objectContaining({ return_quantity: 1 }),
      expect.objectContaining({ return_quantity: 2 }),
    ])
  })

  it('should be able to return products and see the amount products', async () => {
    await sut.execute({
      loanId: '1',
      products: [
        {
          id: '1',
          return_quantity: 1,
        },
        {
          id: '2',
          return_quantity: 2,
        },
      ],
    })

    const storedProducts = productRepository.products

    expect(storedProducts).toEqual([
      expect.objectContaining({ name: 'Scissors', quantity: 4 }),
      expect.objectContaining({ name: 'Eraser', quantity: 7 }),
    ])
  })

  it('should be not able to return products with a loan COMPLETED', async () => {
    await sut.execute({
      loanId: '1',
      products: [
        {
          id: '1',
          return_quantity: 1,
        },
        {
          id: '2',
          return_quantity: 2,
        },
      ],
    })

    await expect(() =>
      sut.execute({
        loanId: '1',
        products: [
          {
            id: '1',
            return_quantity: 1,
          },
          {
            id: '2',
            return_quantity: 2,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InvalidReturnError)
  })
})
