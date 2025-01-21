import { Loan } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'

interface GetLoansByStateServiceRequest {
    state: 'LOAN' | 'COMPLETED'
}

interface GetLoansByStateServiceResponse {
    loans: Loan[]
}

export class GetLoansByStateService {
    constructor(private loanRepository: LoanRepository) { }

    async execute({
        state
    }: GetLoansByStateServiceRequest): Promise<GetLoansByStateServiceResponse> {
        const loans = await this.loanRepository.findState(state)

        return { loans }
    }
}