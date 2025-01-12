import { Admin, Prisma } from '@prisma/client'
import { AdminRepository } from '../user-admin-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaAdminRepostitory implements AdminRepository {
  async findByUser(user: string): Promise<Admin | null> {
    const adminWithSameUser = await prisma.admin.findUnique({
      where: {
        user,
      },
    })

    return adminWithSameUser
  }

  async create(data: Prisma.AdminCreateInput) {
    const admin = await prisma.admin.create({
      data,
    })

    return admin
  }
}
