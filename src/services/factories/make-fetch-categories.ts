import { CreateCategoryService } from '../create-category'
import { PrismaCategoryRepository } from 'src/repositories/prisma/prisma-category-repository'
import { FetchCategoriesService } from '../fetch-categories'

export function makeFetchCategoryService() {
    const categoryRepository = new PrismaCategoryRepository()
    const service = new FetchCategoriesService(categoryRepository)

    return service
}