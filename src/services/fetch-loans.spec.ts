import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'
import { FecthLoansService } from './fetch-loans'

let loanRepository: InMemoryLoanRepository
let sut: FecthLoansService

describe('Fetch Products Service', () => {
  beforeEach(() => {
    loanRepository = new InMemoryLoanRepository()
    sut = new FecthLoansService(loanRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch a list of loans with sort by date', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await loanRepository.create({
      id: '1',
      responsible: 'Erick Guerra',
      state: 'LOAN',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await loanRepository.create({
      id: '2',
      responsible: 'New',
      state: 'LOAN',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    await loanRepository.create({
      id: '2',
      responsible: 'Anonymous',
      state: 'LOAN',
      created_at: new Date(),
    })

    const { loans } = await sut.execute({
      page: 1,
    })

    expect(loans).toHaveLength(3)
    expect(loans).toEqual([
      expect.objectContaining({ responsible: 'New' }),
      expect.objectContaining({ responsible: 'Anonymous' }),
      expect.objectContaining({ responsible: 'Erick Guerra' }),
    ])
  })

  it('should be able to fetch paginated products', async () => {
    for (let i = 1; i <= 22; i++) {
      loanRepository.create({
        id: `${i}`,
        responsible: 'Anonymous',
        state: 'LOAN',
        created_at: new Date(),
      })
    }

    const { loans } = await sut.execute({
      page: 2,
    })

    expect(loans).toHaveLength(2)
  })
})
