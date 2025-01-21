import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  search(
    page: number,
    name?: string,
    category?: string,
  ): Promise<{ products: Product[]; totalCount: number }>
  findById(id: string): Promise<Product | null>
  getAll(): Promise<Product[]>
  findAll(page: number): Promise<{ products: Product[]; totalCount: number }>
  save(data: Product): Promise<Product>
  updateQuantity(productId: string, newQuantity: number): Promise<Product>
  create(data: Prisma.ProductCreateInput): Promise<Product>
}
