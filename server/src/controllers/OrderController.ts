import { Request, Response } from 'express'
import { OrderService } from '../services/OrderService'
import { PaystackService } from '../services/PaystackService'

const orderService = new OrderService()
const paystackService = new PaystackService()

export class OrderController {
  async initialize(req: Request, res: Response) {
    try {
      const { customerName, email, address, items } = req.body
      if (!customerName || !email || !address || !items?.length) {
        return res.status(400).json({ error: 'customerName, email, address, and items are required' })
      }

      const order = await orderService.create({ customerName, email, address, items })

      const paystack = await paystackService.initializeTransaction(
        email,
        order.total,
        order.reference
      )

      res.status(201).json({
        orderId: order.id,
        reference: order.reference,
        accessCode: paystack.accessCode,
        authorizationUrl: paystack.authorizationUrl,
      })
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { reference } = req.body
      if (!reference) {
        return res.status(400).json({ error: 'reference is required' })
      }

      const result = await paystackService.verifyTransaction(reference)
      if (!result.paid) {
        return res.status(400).json({ error: `Payment not successful: ${result.gatewayResponse}` })
      }

      const order = await orderService.confirmPayment(reference)
      res.json(order)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const order = await orderService.findById(Number(req.params.id))
      res.json(order)
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }
}
