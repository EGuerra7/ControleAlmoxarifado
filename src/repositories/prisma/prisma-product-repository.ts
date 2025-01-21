import { Prisma, Product } from '@prisma/client'
import { ProductRepository } from '../product-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaProductRepostitory implements ProductRepository {
  async search(page: number, name?: string, category?: string) {
    const totalCount = await prisma.product.count({
      where: {
        name: name
          ? { contains: name.toLowerCase(), mode: 'insensitive' }
          : undefined,
        category: category
          ? { contains: category.toLowerCase(), mode: 'insensitive' }
          : undefined,
      },
    })

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
      take: 10,
      skip: (page - 1) * 10,
    })

    return { products, totalCount }
  }

  async getAll() {
    const products = await prisma.product.findMany()

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
    const totalCount = await prisma.product.count()
    const products = await prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return { products, totalCount }
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
