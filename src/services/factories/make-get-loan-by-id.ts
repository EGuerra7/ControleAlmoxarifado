import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { GetLoanByIdService } from '../get-loan-by-id'

export function makeGetLoanByIdService() {
  const loanRepository = new PrismaLoanRepostitory()

  const service = new GetLoanByIdService(loanRepository)

  return service
}
