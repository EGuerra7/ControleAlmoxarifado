import { Loan, Prisma, State } from '@prisma/client'
import { LoanRepository } from '../loan-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryLoanRepository implements LoanRepository {
  public loans: Loan[] = []

  async search(page: number, responsible?: string, state?: State) {
    this.loans = this.loans.filter((loan) => {
      const matchesName = responsible
        ? loan.responsible.includes(responsible)
        : true
      const matchesCategory = state ? loan.state.includes(state) : true
      return matchesName && matchesCategory
    })

    const totalCount = this.loans.length
    const loans = this.loans.splice((page - 1) * 10, page * 10)

    return { loans, totalCount }
  }

  async findById(id: string) {
    const loan = this.loans.find((loan) => loan.id === id)

    if (!loan) {
      return null
    }

    return loan
  }

  async findAll(page: number) {
    const totalCount = this.loans.length

    const loans = this.loans
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .splice((page - 1) * 10, page * 10)


    return { loans, totalCount }
  }

  async findState(state: State) {
    return this.loans.filter(loan => loan.state === state)
  }

  async updateStatus(id: string, status: State) {
    const loanInIndex = this.loans.findIndex((loan) => loan.id === id)

    if (loanInIndex >= 0) {
      this.loans[loanInIndex].state = status
    }

    return this.loans[loanInIndex]
  }

  async create(data: Prisma.LoanCreateInput) {
    const loan = {
      id: data.id ?? randomUUID(),
      responsible: data.responsible,
      state: data.state!,
      created_at: new Date(),
    }

    this.loans.push(loan)

    return loan
  }
}
