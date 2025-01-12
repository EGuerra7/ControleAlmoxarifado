import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'

interface CreateProductServiceRequest {
  name: string
  quantity: number
  localization: string
  category: string
}

interface CreateProductServiceResponse {
  product: Product
}

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    quantity,
    localization,
    category,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const product = await this.productRepository.create({
      name,
      quantity,
      localization,
      category,
    })

    return { product }
  }
}
