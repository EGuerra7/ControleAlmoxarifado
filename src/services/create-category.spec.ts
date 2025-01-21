import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCategoryRepository } from 'src/repositories/in-memory/in-memory-category-repository'
import { CreateCategoryService } from './create-category'

let categoryRepository: InMemoryCategoryRepository
let sut: CreateCategoryService

describe('Create Category Service', () => {
    beforeEach(() => {
        categoryRepository = new InMemoryCategoryRepository()
        sut = new CreateCategoryService(categoryRepository)
    })

    it('should be able to create category', async () => {
        const { category } = await sut.execute({
            name: 'Stationery'
        })

        expect(category.id).toEqual(expect.any(String))
    })
})