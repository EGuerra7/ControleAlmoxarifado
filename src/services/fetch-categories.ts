import { Category } from "@prisma/client"
import { CategoryRepository } from "src/repositories/category-repository"


interface FetchCategoryServiceResponse {
    categories: Category[]
}

export class FetchCategoriesService {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute(): Promise<FetchCategoryServiceResponse> {
        const categories = await this.categoryRepository.findAll()

        return { categories }
    }
}