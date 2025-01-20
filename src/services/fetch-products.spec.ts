import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FecthProductsService } from './fetch-products'

let productsRepository: InMemoryProductRepository
let sut: FecthProductsService

describe('Fetch Products Service', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductRepository()
    sut = new FecthProductsService(productsRepository)
  })

  it('should be able to fetch a list of products with sort by name', async () => {
    await productsRepository.create({
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    await productsRepository.create({
      name: 'Eraser',
      quantity: 5,
      localization: 'On the first cabinet, in the second shelf',
      category: 'Stationery',
    })

    const { products } = await sut.execute({
      page: 1,
    })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({
        name: 'Eraser',
      }),
      expect.objectContaining({
        name: 'Scissors',
      }),
    ])
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

    const { products, meta } = await sut.execute({
      page: 2,
    })

    expect(products).toHaveLength(2)
    expect(meta.totalCount).toEqual(12)
    expect(meta.totalPages).toEqual(2)
  })
})
