import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryLoanRepository } from 'src/repositories/in-memory/in-memory-loan-repository'
import { GetLoansByStateService } from './get-loans-by-state'

let loanRepository: InMemoryLoanRepository
let sut: GetLoansByStateService

describe('Fetch Products Service', () => {
    beforeEach(() => {
        loanRepository = new InMemoryLoanRepository()
        sut = new GetLoansByStateService(loanRepository)


    })


    it('should be able to fetch loan by state', async () => {
        loanRepository.create({
            id: '1',
            responsible: 'Anonymous',
            state: 'LOAN',
            created_at: new Date(),
        })

        loanRepository.create({
            id: '2',
            responsible: 'Anonymous',
            state: 'COMPLETED',
            created_at: new Date(),
        })

        const { loans } = await sut.execute({
            state: 'LOAN'
        })

        expect(loans).toHaveLength(1)
        expect(loans).toEqual([expect.objectContaining({ id: '1', state: 'LOAN' })])
    })
})