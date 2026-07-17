import { prisma } from '../config/prisma'
import { storageService } from './StorageService'

export class ProductService {
  async findAll(category?: string) {
    const where = category ? { category } : {}
    return prisma.product.findMany({ where, orderBy: { id: 'asc' } })
  }

  async findById(id: number) {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) throw new Error('Product not found')
    return product
  }

  async create(data: {
    title: string
    price: number
    originalPrice: number
    category: string
    image?: string
    imageFile?: { buffer: Buffer; mimetype: string; filename: string }
  }) {
    let image = data.image || ''

    if (data.imageFile) {
      image = await storageService.upload(
        data.imageFile.filename,
        data.imageFile.buffer,
        data.imageFile.mimetype
      )
    }

    return prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        originalPrice: data.originalPrice,
        category: data.category,
        image,
      },
    })
  }

  async update(
    id: number,
    data: Partial<{
      title: string
      price: number
      originalPrice: number
      category: string
      image: string
      imageFile?: { buffer: Buffer; mimetype: string; filename: string }
    }>
  ) {
    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) throw new Error('Product not found')

    const updateData: any = { ...data }
    delete updateData.imageFile

    if (data.imageFile) {
      if (existing.image.startsWith('http') && !existing.image.startsWith('data:')) {
        await storageService.delete(existing.image).catch(() => {})
      }
      updateData.image = await storageService.upload(
        data.imageFile.filename,
        data.imageFile.buffer,
        data.imageFile.mimetype
      )
    }

    return prisma.product.update({ where: { id }, data: updateData })
  }

  async delete(id: number) {
    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) throw new Error('Product not found')
    if (existing.image.startsWith('http') && !existing.image.startsWith('data:')) {
      await storageService.delete(existing.image).catch(() => {})
    }
    await prisma.product.delete({ where: { id } })
  }
}
