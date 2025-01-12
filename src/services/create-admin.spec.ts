import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAdminService } from './create-admin'
import { InMemoryAdminRepository } from 'src/repositories/in-memory/in-memory-user-admin-repository'

let adminRepository: InMemoryAdminRepository
let sut: CreateAdminService

describe('Create Admin Service', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminRepository()
    sut = new CreateAdminService(adminRepository)
  })

  it('should be able to create product', async () => {
    const { admin } = await sut.execute({
      user: 'admin123',
      password: '123',
    })

    expect(admin.id).toEqual(expect.any(String))
  })
})
