import { Loan } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'

interface FetchLoansServiceRequest {
  page: number
}

interface FetchLoansServiceResponse {
  loans: Loan[]
  meta: {
    totalCount: number
    totalPages: number
  }
}

export class FecthLoansService {
  constructor(private loanRepository: LoanRepository) { }

  async execute({
    page,
  }: FetchLoansServiceRequest): Promise<FetchLoansServiceResponse> {
    const { loans, totalCount } = await this.loanRepository.findAll(page)
    const totalPages = Math.ceil(totalCount / 10)

    return {
      loans, meta: {
        totalCount,
        totalPages,
      }
    }
  }
}
