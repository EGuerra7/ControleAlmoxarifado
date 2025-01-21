import { Category } from "@prisma/client"
import { CategoryRepository } from "src/repositories/category-repository"

interface CreateCategoryServiceRequest {
    name: string
}

interface CreateCategoryServiceResponse {
    category: Category
}

export class CreateCategoryService {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute({
        name
    }: CreateCategoryServiceRequest): Promise<CreateCategoryServiceResponse> {
        const category = await this.categoryRepository.create({
            name,
        })

        return { category }
    }
}