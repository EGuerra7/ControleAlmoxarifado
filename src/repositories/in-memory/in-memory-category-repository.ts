import { Category, Prisma } from "@prisma/client";
import { CategoryRepository } from "../category-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCategoryRepository implements CategoryRepository {
    public categories: Category[] = []


    async findAll() {
        return this.categories
    }

    async create(data: Prisma.CategoryCreateInput) {
        const category = {
            id: randomUUID(),
            name: data.name,
        }

        this.categories.push(category)

        return category
    }
}