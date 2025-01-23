import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'

import { beforeEach, describe, expect, it } from 'vitest'
import { GetLoanByIdService } from './get-loan-by-id'
import { ResourseNotFoundError } from './errors/resource-not-find-error'

let loanRepository: InMemoryLoanRepository
let sut: GetLoanByIdService

describe('Get Loan By Id', () => {
  beforeEach(() => {
    loanRepository = new InMemoryLoanRepository()
    sut = new GetLoanByIdService(loanRepository)
  })

  it('should be able to get a loan by id', async () => {
    await loanRepository.create({
      id: '1',
      responsible: 'Someone 1',
      state: 'LOAN',
      created_at: new Date(),
    })

    await loanRepository.create({
      id: '2',
      responsible: 'Someone 2',
      state: 'LOAN',
      created_at: new Date(),
    })

    const { loan } = await sut.execute({
      loanId: '2',
    })

    expect(loan).toEqual(expect.objectContaining({ id: '2' }))
  })

  it('should not be able to get a loan with one unexisted id', async () => {
    await loanRepository.create({
      id: '1',
      responsible: 'Someone 1',
      state: 'LOAN',
      created_at: new Date(),
    })

    await loanRepository.create({
      id: '2',
      responsible: 'Someone 2',
      state: 'LOAN',
      created_at: new Date(),
    })

    await expect(() =>
      sut.execute({
        loanId: '3',
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError)
  })
})
