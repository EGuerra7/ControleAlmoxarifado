import { InMemoryProductRepository } from 'src/repositories/in-memory/in-memory-product-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditProductService } from './edit-product'
import { ResourseNotFoundError } from './errors/resource-not-find-error'

let productsRepository: InMemoryProductRepository
let sut: EditProductService

describe('Edit Product Service', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductRepository()
    sut = new EditProductService(productsRepository)
  })

  it('should be able to edit an product', async () => {
    const productCreated = await productsRepository.create({
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    const { product } = await sut.execute({
      id: productCreated.id,
      name: 'Scissors',
      quantity: 7,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    expect(product.quantity).toEqual(7)
  })

  it('should not be able to edit an product', async () => {
    await productsRepository.create({
      name: 'Scissors',
      quantity: 3,
      localization: 'On the first cabinet, in the third shelf',
      category: 'Stationery',
    })

    await productsRepository.create({
      name: 'Eraser',
      quantity: 6,
      localization: 'On the first cabinet, in the second shelf',
      category: 'Stationery',
    })

    await expect(() =>
      sut.execute({
        id: 'Unexisted-id',
        name: 'Scissors',
        quantity: 7,
        localization: 'On the first cabinet, in the third shelf',
        category: 'Stationery',
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError)
  })
})
