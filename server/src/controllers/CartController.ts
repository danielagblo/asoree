import { Request, Response } from 'express'
import { CartService } from '../services/CartService'

const cartService = new CartService()

export class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const token = req.params.token as string
      const cart = await cartService.getCart(token)
      res.json(cart)
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const token = req.params.token as string
      const { productId, quantity } = req.body
      if (!productId || !quantity) {
        return res.status(400).json({ error: 'productId and quantity are required' })
      }
      const item = await cartService.addItem(token, productId, quantity)
      res.status(201).json(item)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const token = req.params.token as string
      await cartService.removeItem(token, Number(req.params.itemId))
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const token = req.params.token as string
      await cartService.clearCart(token)
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }
}
