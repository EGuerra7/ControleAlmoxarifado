import { Product } from '@prisma/client'
import { ProductRepository } from 'src/repositories/product-repository'
import { ResourseNotFoundError } from './errors/resource-not-find-error'

interface CreateProductServiceRequest {
  id: string
  name: string
  quantity: number
  localization: string
  category: string
}

interface CreateProductServiceResponse {
  product: Product
}

export class EditProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    quantity,
    localization,
    category,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const productExists = await this.productRepository.findById(id)

    if (!productExists) {
      throw new ResourseNotFoundError()
    }

    const product = await this.productRepository.save({
      id,
      name,
      quantity,
      localization,
      category,
    })

    return { product }
  }
}
