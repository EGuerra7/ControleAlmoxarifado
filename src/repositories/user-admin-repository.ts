import { Admin, Prisma } from '@prisma/client'

export interface AdminRepository {
  findByUser(user: string): Promise<Admin | null>
  create(data: Prisma.AdminCreateInput): Promise<Admin>
}
