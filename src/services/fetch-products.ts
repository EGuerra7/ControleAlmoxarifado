import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface FetchProductsServiceRequest {
  page: number
}

interface FetchProductsServiceResponse {
  products: Product[]
}

export class FecthProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
  }: FetchProductsServiceRequest): Promise<FetchProductsServiceResponse> {
    const products = await this.productRepository.findAll(page)

    return { products }
  }
}
