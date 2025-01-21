import { Category, Prisma } from "@prisma/client";

export interface CategoryRepository {
    findAll(): Promise<Category[]>
    create(data: Prisma.CategoryCreateInput): Promise<Category>
}