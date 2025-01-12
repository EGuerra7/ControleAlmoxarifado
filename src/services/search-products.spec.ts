import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchProductsService } from './search-products'

let productsRepository: InMemoryProductRepository
let sut: SearchProductsService

describe('Search Products Service', () => {
  beforeEach(async () => {
    productsRepository = new InMemoryProductRepository()
    sut = new SearchProductsService(productsRepository)

    await productsRepository.create({
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Example 1',
    })

    await productsRepository.create({
      name: 'Eraser',
      quantity: 5,
      localization: 'On the first cabinet, in the second shelf',
      category: 'Example 2',
    })

    await productsRepository.create({
      name: 'Pen',
      quantity: 5,
      localization: 'On the first cabinet, in the first shelf',
      category: 'Example 1',
    })
  })

  it('should be able to search the product by name', async () => {
    const { products } = await sut.execute({
      name: 'Eraser',
    })

    expect(products).toHaveLength(1)
    expect(products).toEqual([expect.objectContaining({ name: 'Eraser' })])
  })

  it('should be able to search the product by category', async () => {
    const { products } = await sut.execute({
      category: 'Example 1',
    })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Scissors' }),
      expect.objectContaining({ name: 'Pen' }),
    ])
  })

  it('should be able to search the product by name and category', async () => {
    const { products } = await sut.execute({
      name: 'Pen',
      category: 'Example 1',
    })

    expect(products).toHaveLength(1)
    expect(products).toEqual([expect.objectContaining({ name: 'Pen' })])
  })
})
