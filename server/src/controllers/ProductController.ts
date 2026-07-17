import { Request, Response } from 'express'
import { ProductService } from '../services/ProductService'

const productService = new ProductService()

export class ProductController {
  async findAll(req: Request, res: Response) {
    const category = req.query.category as string | undefined
    const products = await productService.findAll(category)
    res.json(products)
  }

  async findById(req: Request, res: Response) {
    try {
      const product = await productService.findById(Number(req.params.id))
      res.json(product)
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const file = req.file
      const product = await productService.create({
        title: req.body.title,
        price: parseFloat(req.body.price),
        originalPrice: parseFloat(req.body.originalPrice),
        category: req.body.category,
        image: req.body.image,
        ...(file
          ? {
              imageFile: {
                buffer: file.buffer,
                mimetype: file.mimetype,
                filename: file.originalname,
              },
            }
          : {}),
      })
      res.status(201).json(product)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const file = req.file
      const product = await productService.update(Number(req.params.id), {
        title: req.body.title,
        price: req.body.price ? parseFloat(req.body.price) : undefined,
        originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : undefined,
        category: req.body.category,
        image: req.body.image,
        ...(file
          ? {
              imageFile: {
                buffer: file.buffer,
                mimetype: file.mimetype,
                filename: file.originalname,
              },
            }
          : {}),
      })
      res.json(product)
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await productService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (err: any) {
      res.status(404).json({ error: err.message })
    }
  }
}
