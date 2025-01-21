import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCategoryRepository } from 'src/repositories/in-memory/in-memory-category-repository'
import { FetchCategoriesService } from './fetch-categories'

let categoryRepository: InMemoryCategoryRepository
let sut: FetchCategoriesService

describe('Fetch Categories Service', () => {
    beforeEach(() => {
        categoryRepository = new InMemoryCategoryRepository()
        sut = new FetchCategoriesService(categoryRepository)
    })

    it('should be able to Fetch  categories', async () => {
        const { categories } = await sut.execute()

        categoryRepository.create({
            id: '1',
            name: 'Stationery'
        })

        expect(categories).toEqual([expect.objectContaining({ name: 'Stationery' })])
    })
})