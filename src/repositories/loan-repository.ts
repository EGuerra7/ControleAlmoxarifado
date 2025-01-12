import { Loan, Prisma, State } from '@prisma/client'

export interface LoanRepository {
  search(responsible?: string, state?: State): Promise<Loan[]>
  findById(id: string): Promise<Loan | null>
  findAll(page: number): Promise<Loan[]>
  updateStatus(id: string, status: State): Promise<Loan>
  create(data: Prisma.LoanCreateInput): Promise<Loan>
}
