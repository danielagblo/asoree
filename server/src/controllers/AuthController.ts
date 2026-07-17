import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

const authService = new AuthService()

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    try {
      const result = await authService.login(email, password)
      res.json(result)
    } catch (err: any) {
      res.status(401).json({ error: err.message })
    }
  }
}
