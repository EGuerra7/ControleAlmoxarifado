import { State, Loan, Prisma } from '@prisma/client'
import { LoanRepository } from '../loan-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaLoanRepostitory implements LoanRepository {
  async search(responsible?: string, state?: State): Promise<Loan[]> {
    const searchedLoans = await prisma.loan.findMany({
      where: {
        responsible: responsible
          ? { contains: responsible.toLowerCase(), mode: 'insensitive' }
          : undefined,
        state: state || undefined,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return searchedLoans
  }

  async findById(id: string) {
    const loan = await prisma.loan.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return loan
  }

  async findAll(page: number) {
    const loans = await prisma.loan.findMany({
      orderBy: {
        created_at: 'asc',
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return loans
  }

  async updateStatus(id: string, status: State) {
    const updatedLoan = await prisma.loan.update({
      where: {
        id,
      },
      data: {
        state: status,
      },
    })

    return updatedLoan
  }

  async create(data: Prisma.LoanCreateInput) {
    const loan = await prisma.loan.create({
      data,
    })

    return loan
  }
}
