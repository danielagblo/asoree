import { Request } from 'express'

export interface AuthPayload {
  adminId: number
  email: string
}

export interface AuthRequest extends Request {
  admin?: AuthPayload
}
