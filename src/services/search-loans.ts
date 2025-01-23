import { Loan, State } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'

interface SearchLoanServiceRequest {
  page: number
  responsible?: string
  state?: State
}

interface SearchLoanServiceResponse {
  loans: Loan[]
  meta: {
    totalCount: number
    totalPages: number
  }
}

export class SearchLoanService {
  constructor(private loanRepository: LoanRepository) {}

  async execute({
    page,
    responsible,
    state,
  }: SearchLoanServiceRequest): Promise<SearchLoanServiceResponse> {
    const { loans, totalCount } = await this.loanRepository.search(
      page,
      responsible,
      state,
    )

    const totalPages = Math.ceil(totalCount / 10)

    return {
      loans,
      meta: {
        totalCount,
        totalPages,
      },
    }
  }
}
