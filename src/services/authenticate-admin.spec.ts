import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAdminRepository } from 'src/repositories/in-memory/in-memory-user-admin-repository'
import { AuthenticateAdminService } from './authenticate-admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let adminRepository: InMemoryAdminRepository
let sut: AuthenticateAdminService

describe('Authenticate Admin Service', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminRepository()
    sut = new AuthenticateAdminService(adminRepository)

    adminRepository.create({
      user: 'admin123',
      password: '123',
    })
  })

  it('should be able to authenticate admin user', async () => {
    const { admin } = await sut.execute({
      user: 'admin123',
      password: '123',
    })

    expect(admin.id).toEqual(expect.any(String))
  })

  it('should be not able to authenticate with wrong user', async () => {
    await expect(() =>
      sut.execute({
        user: 'admin13',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        user: 'admin123',
        password: '12412',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
