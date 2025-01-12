import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { SearchLoanService } from '../search-loans'

export function makeSearchLoansService() {
  const loanRepository = new PrismaLoanRepostitory()
  const service = new SearchLoanService(loanRepository)

  return service
}
