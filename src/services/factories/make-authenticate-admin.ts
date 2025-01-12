import { PrismaAdminRepostitory } from 'src/repositories/prisma/prisma-user-admin-repository'
import { AuthenticateAdminService } from '../authenticate-admin'

export function makeAuthenticateAdminService() {
  const adminRepository = new PrismaAdminRepostitory()
  const service = new AuthenticateAdminService(adminRepository)

  return service
}
