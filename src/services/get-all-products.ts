import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface GetAllProductsServiceResponse {
  products: Product[]
}

export class GetAllProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<GetAllProductsServiceResponse> {
    const products = await this.productRepository.getAll()

    return {
      products,
    }
  }
}
