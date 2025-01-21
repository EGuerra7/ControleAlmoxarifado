import { Loan, Prisma, State } from '@prisma/client'

export interface LoanRepository {
  search(page: number, responsible?: string, state?: State): Promise<{ loans: Loan[], totalCount: number }>
  findById(id: string): Promise<Loan | null>
  findAll(page: number): Promise<{ loans: Loan[], totalCount: number }>
  findState(state: State): Promise<Loan[]>
  updateStatus(id: string, status: State): Promise<Loan>
  create(data: Prisma.LoanCreateInput): Promise<Loan>
}
