import { Loan } from '@prisma/client'
import { LoanRepository } from 'src/repositories/loan-repository'
import { ResourseNotFoundError } from './errors/resource-not-find-error'

interface GetLoanByIdServiceRequest {
  loanId: string
}

interface GetLoanByIdServiceResponse {
  loan: Loan
}

export class GetLoanByIdService {
  constructor(private loanRepository: LoanRepository) {}

  async execute({
    loanId,
  }: GetLoanByIdServiceRequest): Promise<GetLoanByIdServiceResponse> {
    const loan = await this.loanRepository.findById(loanId)

    if (!loan) {
      throw new ResourseNotFoundError()
    }

    return { loan }
  }
}
