import { prisma } from '../config/prisma'
import { v4 as uuidv4 } from 'uuid'

export class OrderService {
  async create(data: {
    customerName: string
    email: string
    address: string
    items: { productId: number; quantity: number; price: number }[]
  }) {
    const total = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const reference = `ASOREE-${uuidv4().slice(0, 8).toUpperCase()}`

    return prisma.order.create({
      data: {
        customerName: data.customerName,
        email: data.email,
        address: data.address,
        total,
        reference,
        paymentStatus: 'pending',
        items: {
          create: data.items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })
  }

  async findById(id: number) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    })
    if (!order) throw new Error('Order not found')
    return order
  }

  async confirmPayment(reference: string) {
    const order = await prisma.order.findUnique({ where: { reference } })
    if (!order) throw new Error('Order not found')
    if (order.paymentStatus === 'confirmed') return order

    return prisma.order.update({
      where: { reference },
      data: { paymentStatus: 'confirmed' },
      include: { items: { include: { product: true } } },
    })
  }
}
