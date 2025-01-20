import { Loan } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'

interface FetchLoansServiceRequest {
  page: number
}

interface FetchLoansServiceResponse {
  loans: Loan[]
}

export class FecthLoansService {
  constructor(private loanRepository: LoanRepository) { }

  async execute({
    page,
  }: FetchLoansServiceRequest): Promise<FetchLoansServiceResponse> {
    const loans = await this.loanRepository.findAll(page)

    return { loans }
  }
}
