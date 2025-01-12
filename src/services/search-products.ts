import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface SearchProductsServiceRequest {
  name?: string
  category?: string
}

interface SearchProductsServiceResponse {
  products: Product[]
}

export class SearchProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    category,
  }: SearchProductsServiceRequest): Promise<SearchProductsServiceResponse> {
    const products = await this.productRepository.search(name, category)

    return { products }
  }
}
