import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'
import { InMemoryLoanProductsRepository } from 'src/repositories/in-memory/in-memory-loanProducts-repository'
import { CreateLoanService } from './create-loan'
import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { InsufficientStockError } from './errors/insufficient-stock-error'

let loanRepository: InMemoryLoanRepository
let loanProductsRepository: InMemoryLoanProductsRepository
let productRepository: InMemoryProductRepository
let sut: CreateLoanService

describe('Create Loan Service', () => {
  beforeEach(async () => {
    loanRepository = new InMemoryLoanRepository()
    loanProductsRepository = new InMemoryLoanProductsRepository()
    productRepository = new InMemoryProductRepository()
    sut = new CreateLoanService(
      loanRepository,
      loanProductsRepository,
      productRepository,
    )

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
  })

  it('should be able to create a loan whith many products', async () => {
    const { loan } = await sut.execute({
      responsible: 'Erick Guerra',
      products: [
        {
          id: '1',
          loan_quantity: 3,
          return_quantity: 0,
        },
        {
          id: '2',
          loan_quantity: 4,
          return_quantity: 0,
        },
      ],
    })

    expect(loan.id).toEqual(expect.any(String))

    const storedLoanProducts = loanProductsRepository.loanProducts
    expect(storedLoanProducts).toHaveLength(2)
    expect(storedLoanProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          loan_id: loan.id,
          product_id: '1',
          loan_quantity: 3,
          return_quantity: 0,
        }),
        expect.objectContaining({
          loan_id: loan.id,
          product_id: '2',
          loan_quantity: 4,
          return_quantity: 0,
        }),
      ]),
    )
  })

  it('should be not able to create a new loan with more products than he has in stock', async () => {
    await expect(() =>
      sut.execute({
        responsible: 'Erick Guerra',
        products: [
          {
            id: '1',
            loan_quantity: 4,
            return_quantity: 0,
          },
          {
            id: '2',
            loan_quantity: 3,
            return_quantity: 0,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(InsufficientStockError)
  })

  it('should be not able change the product amount with the loan amount', async () => {
    await sut.execute({
      responsible: 'Erick Guerra',
      products: [
        {
          id: '1',
          loan_quantity: 3,
          return_quantity: 0,
        },
        {
          id: '2',
          loan_quantity: 4,
          return_quantity: 0,
        },
      ],
    })

    const storedProducts = productRepository.products

    expect(storedProducts).toEqual([
      expect.objectContaining({ name: 'Scissors', quantity: 0 }),
      expect.objectContaining({ name: 'Eraser', quantity: 1 }),
    ])
  })
})
