import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'
import { SearchLoanService } from './search-loans'

let loanRepository: InMemoryLoanRepository
let sut: SearchLoanService

describe('Search Loan Service', () => {
  beforeEach(async () => {
    loanRepository = new InMemoryLoanRepository()
    sut = new SearchLoanService(loanRepository)

    vi.useFakeTimers()

    await loanRepository.create({
      id: '1',
      responsible: 'Erick Guerra',
      state: 'LOAN',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await loanRepository.create({
      id: '2',
      responsible: 'Erick Guerra',
      state: 'COMPLETED',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    await loanRepository.create({
      id: '3',
      responsible: 'Anonymous',
      state: 'COMPLETED',
      created_at: new Date(),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search the loan by responsible', async () => {
    const { loans } = await sut.execute({
      responsible: 'Erick Guerra',
    })

    expect(loans).toHaveLength(2)
    expect(loans).toEqual([
      expect.objectContaining({ responsible: 'Erick Guerra' }),
      expect.objectContaining({ responsible: 'Erick Guerra' }),
    ])
  })

  it('should be able to search the loan by state', async () => {
    const { loans } = await sut.execute({
      state: 'COMPLETED',
    })

    expect(loans).toHaveLength(2)
    expect(loans).toEqual([
      expect.objectContaining({ responsible: 'Erick Guerra' }),
      expect.objectContaining({ responsible: 'Anonymous' }),
    ])
  })

  it('should be able to search the loan by responsible and state', async () => {
    const { loans } = await sut.execute({
      responsible: 'Erick Guerra',
      state: 'LOAN',
    })

    expect(loans).toHaveLength(1)
    expect(loans).toEqual([
      expect.objectContaining({ responsible: 'Erick Guerra', state: 'LOAN' }),
    ])
  })
})
