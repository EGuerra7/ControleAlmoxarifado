import { CreateCategoryService } from '../create-category'
import { PrismaCategoryRepository } from 'src/repositories/prisma/prisma-category-repository'

export function makeCreateCategoryService() {
    const categoryRepository = new PrismaCategoryRepository()
    const service = new CreateCategoryService(categoryRepository)

    return service
}