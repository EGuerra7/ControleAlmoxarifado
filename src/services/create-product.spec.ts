import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { CreateProductService } from './create-product'
import { beforeEach, describe, expect, it } from 'vitest'

let productsRepository: InMemoryProductRepository
let sut: CreateProductService

describe('Create Product Service', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductRepository()
    sut = new CreateProductService(productsRepository)
  })

  it('should be able to create product', async () => {
    const { product } = await sut.execute({
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
