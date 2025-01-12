import { Prisma, Admin } from '@prisma/client'
import { AdminRepository } from '../user-admin-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAdminRepository implements AdminRepository {
  admins: Admin[] = []

  async findByUser(user: string) {
    const admin = this.admins.find((admin) => admin.user === user)

    if (!admin) {
      return null
    }

    return admin
  }

  async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    const admin = {
      id: randomUUID(),
      user: data.user,
      password: data.password,
    }

    this.admins.push(admin)

    return admin
  }
}
