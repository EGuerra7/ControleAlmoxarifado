import { Admin } from '@prisma/client'

import { AdminRepository } from 'src/repositories/user-admin-repository'

interface CreateAdminServiceRequest {
  user: string
  password: string
}

interface CreateAdminServiceResponse {
  admin: Admin
}

export class CreateAdminService {
  constructor(private adminRepository: AdminRepository) {}

  async execute({
    user,
    password,
  }: CreateAdminServiceRequest): Promise<CreateAdminServiceResponse> {
    const admin = await this.adminRepository.create({
      user,
      password,
    })

    return { admin }
  }
}
