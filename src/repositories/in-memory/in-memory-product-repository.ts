import { Prisma, Product } from '@prisma/client'
import { ProductRepository } from '../product-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = []

  async search(name?: string, category?: string) {
    this.products = this.products.filter((product) => {
      const matchesName = name ? product.name.includes(name) : true
      const matchesCategory = category
        ? product.category.includes(category)
        : true
      return matchesName && matchesCategory
    })

    return this.products
  }

  async findById(id: string) {
    const product = this.products.find((product) => product.id === id)

    if (!product) {
      return null
    }

    return product
  }

  async findAll(page: number) {
    return this.products
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice((page - 1) * 20, page * 20)
  }

  async save(data: Product) {
    const productInIndex = this.products.findIndex(
      (item) => item.id === data.id,
    )

    if (productInIndex >= 0) {
      this.products[productInIndex] = data
    }

    return data
  }

  async updateQuantity(productId: string, newQuantity: number) {
    const productInIndex = this.products.findIndex(
      (item) => item.id === productId,
    )

    if (productInIndex >= 0) {
      this.products[productInIndex].quantity = newQuantity
    }

    return this.products[productInIndex]
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      quantity: data.quantity,
      localization: data.localization,
      category: data.category,
    }

    this.products.push(product)

    return product
  }
}
