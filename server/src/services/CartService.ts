import { prisma } from '../config/prisma'
import { v4 as uuidv4 } from 'uuid'

export class CartService {
  async getOrCreateCart(token?: string) {
    if (token) {
      const existing = await prisma.cart.findUnique({
        where: { token },
        include: { items: { include: { product: true } } },
      })
      if (existing) return existing
    }

    const newToken = token || uuidv4()
    return prisma.cart.create({
      data: { token: newToken },
      include: { items: { include: { product: true } } },
    })
  }

  async getCart(token: string) {
    const cart = await prisma.cart.findUnique({
      where: { token },
      include: { items: { include: { product: true } } },
    })
    if (!cart) throw new Error('Cart not found')
    return cart
  }

  async addItem(token: string, productId: number, quantity: number) {
    const cart = await this.getOrCreateCart(token)

    const existing = cart.items.find((i: { productId: number }) => i.productId === productId)
    if (existing) {
      return prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      })
    }

    return prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
      include: { product: true },
    })
  }

  async removeItem(cartToken: string, itemId: number) {
    const cart = await prisma.cart.findUnique({ where: { token: cartToken } })
    if (!cart) throw new Error('Cart not found')

    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    })
    if (!item) throw new Error('Item not found in cart')

    await prisma.cartItem.delete({ where: { id: itemId } })
  }

  async clearCart(token: string) {
    const cart = await prisma.cart.findUnique({ where: { token } })
    if (!cart) throw new Error('Cart not found')
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  }
}
