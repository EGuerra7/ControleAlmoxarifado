import { State, Loan, Prisma } from '@prisma/client'
import { LoanRepository } from '../loan-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaLoanRepostitory implements LoanRepository {
  async search(page: number, responsible?: string, state?: State) {
    const searchedLoans = await prisma.loan.findMany({
      where: {
        responsible: responsible
          ? { contains: responsible.toLowerCase(), mode: 'insensitive' }
          : undefined,
        state: state || undefined,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    const totalCount = await prisma.loan.count({
      where: {
        responsible: responsible
          ? { contains: responsible.toLowerCase(), mode: 'insensitive' }
          : undefined,
        state: state || undefined,
      },
    })



    return { loans: searchedLoans, totalCount }
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
    const totalCount = await prisma.loan.count()

    const loans = await prisma.loan.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return { loans, totalCount }
  }

  async findState(state: State) {
    const loans = await prisma.loan.findMany({
      orderBy: {
        created_at: 'desc',
      },
      where: {
        state,
      },
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
