import { Prisma, Product } from '@prisma/client'
import { ProductRepository } from '../product-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaProductRepostitory implements ProductRepository {
  async search(name?: string, category?: string) {
    const products = await prisma.product.findMany({
      where: {
        name: name
          ? { contains: name.toLowerCase(), mode: 'insensitive' }
          : undefined,
        category: category
          ? { contains: category.toLowerCase(), mode: 'insensitive' }
          : undefined,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return products
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  async findAll(page: number) {
    const products = await prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return products
  }

  async save(data: Product) {
    const product = await prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    })

    return product
  }

  async updateQuantity(productId: string, newQuantity: number) {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantity: newQuantity,
      },
    })

    return updatedProduct
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = prisma.product.create({
      data,
    })

    return product
  }
}
