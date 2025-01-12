import { Loan, State } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'

interface SearchLoanServiceRequest {
  responsible?: string
  state?: State
}

interface SearchLoanServiceResponse {
  loans: Loan[]
}

export class SearchLoanService {
  constructor(private loanRepository: LoanRepository) {}

  async execute({
    responsible,
    state,
  }: SearchLoanServiceRequest): Promise<SearchLoanServiceResponse> {
    const loans = await this.loanRepository.search(responsible, state)

    return { loans }
  }
}
