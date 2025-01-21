import { PrismaLoanRepostitory } from 'src/repositories/prisma/prisma-loan-repository'
import { GetLoansByStateService } from '../get-loans-by-state'

export function makeGetLoansByStateService() {
    const loanRepository = new PrismaLoanRepostitory()

    const service = new GetLoansByStateService(loanRepository)

    return service
}