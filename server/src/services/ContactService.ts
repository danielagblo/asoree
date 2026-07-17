import { prisma } from '../config/prisma'

export class ContactService {
  async create(data: {
    firstName: string
    lastName: string
    email: string
    mobile?: string
    message: string
  }) {
    return prisma.contact.create({ data })
  }

  async findAll() {
    return prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
  }
}
