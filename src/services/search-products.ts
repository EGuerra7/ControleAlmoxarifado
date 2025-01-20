import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface SearchProductsServiceRequest {
  page: number
  name?: string
  category?: string
}

interface SearchProductsServiceResponse {
  products: Product[]
  meta: {
    totalCount: number
    totalPages: number
  }
}

export class SearchProductsService {
  constructor(private productRepository: ProductRepository) { }

  async execute({
    page,
    name,
    category,
  }: SearchProductsServiceRequest): Promise<SearchProductsServiceResponse> {
    const { products, totalCount } = await this.productRepository.search(
      page,
      name,
      category,
    )
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
