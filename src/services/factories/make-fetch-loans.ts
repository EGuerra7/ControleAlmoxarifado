import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { FecthLoansService } from '../fetch-loans'

export function makeFetchLoansService() {
  const loanRepository = new PrismaLoanRepostitory()

  const service = new FecthLoansService(loanRepository)

  return service
}
