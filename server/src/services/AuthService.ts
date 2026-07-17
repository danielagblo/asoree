import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma'
import { env } from '../config/env'

export class AuthService {
  async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) throw new Error('Invalid credentials')

    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) throw new Error('Invalid credentials')

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      env.jwtSecret,
      { expiresIn: '7d' }
    )

    return { token, email: admin.email }
  }
}
