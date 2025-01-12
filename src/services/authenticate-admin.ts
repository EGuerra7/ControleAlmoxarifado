import { Admin } from '@prisma/client'
import { AdminRepository } from 'src/repositories/user-admin-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateAdminServiceRequest {
  user: string
  password: string
}

interface AuthenticateAdminServiceResponse {
  admin: Admin
}

export class AuthenticateAdminService {
  constructor(private adminRepository: AdminRepository) {}

  async execute({
    user,
    password,
  }: AuthenticateAdminServiceRequest): Promise<AuthenticateAdminServiceResponse> {
    const admin = await this.adminRepository.findByUser(user)

    if (!admin || admin.password !== password) {
      throw new InvalidCredentialsError()
    }

    return { admin }
  }
}
