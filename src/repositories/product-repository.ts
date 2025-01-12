import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  search(name?: string, category?: string): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  findAll(page: number): Promise<Product[]>
  save(data: Product): Promise<Product>
  updateQuantity(productId: string, newQuantity: number): Promise<Product>
  create(data: Prisma.ProductCreateInput): Promise<Product>
}
