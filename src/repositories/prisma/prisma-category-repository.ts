import { prisma } from "src/lib/prisma"
import { CategoryRepository } from "../category-repository"
import { Prisma } from "@prisma/client"

export class PrismaCategoryRepository implements CategoryRepository {

    async findAll() {
        const categories = await prisma.category.findMany()

        return categories
    }

    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({
            data,
        })

        return category
    }
}