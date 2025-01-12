import { PrismaAdminRepostitory } from 'src/repositories/prisma/prisma-user-admin-repository'
import { CreateAdminService } from '../create-admin'

export function makeCreateAdminService() {
  const adminRepository = new PrismaAdminRepostitory()
  const service = new CreateAdminService(adminRepository)

  return service
}
