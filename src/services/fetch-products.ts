import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface FetchProductsServiceRequest {
  page: number
}

interface FetchProductsServiceResponse {
  products: Product[]
  meta: {
    totalCount: number
    totalPages: number
  }
}

export class FecthProductsService {
  constructor(private productRepository: ProductRepository) { }

  async execute({
    page,
  }: FetchProductsServiceRequest): Promise<FetchProductsServiceResponse> {
    const { products, totalCount } = await this.productRepository.findAll(page)
    const totalPages = Math.ceil(totalCount / 10)

    return {
      products,
      meta: {
        totalCount,
        totalPages,
      },
    }
  }
}
