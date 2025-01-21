import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllProductsService } from './get-all-products'

let productsRepository: InMemoryProductRepository
let sut: GetAllProductsService

describe('Get all Products Service', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductRepository()
    sut = new GetAllProductsService(productsRepository)
  })

  it('should be able to fetch paginated products and count all', async () => {
    for (let i = 1; i <= 12; i++) {
      productsRepository.create({
        name: `product ${i}`,
        quantity: 10,
        localization: 'Random',
        category: 'Random',
      })
    }

    const { products } = await sut.execute()

    expect(products).toHaveLength(12)
  })
})
