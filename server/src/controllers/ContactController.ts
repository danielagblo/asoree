import { Request, Response } from 'express'
import { ContactService } from '../services/ContactService'

const contactService = new ContactService()

export class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, mobile, message } = req.body
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: 'firstName, lastName, email, and message are required' })
      }
      const contact = await contactService.create({ firstName, lastName, email, mobile, message })
      res.status(201).json(contact)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async findAll(_req: Request, res: Response) {
    const contacts = await contactService.findAll()
    res.json(contacts)
  }
}
