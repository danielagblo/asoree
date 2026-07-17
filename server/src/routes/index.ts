import { Router } from 'express'
import { env } from '../config/env'
import productRoutes from './productRoutes'
import cartRoutes from './cartRoutes'
import orderRoutes from './orderRoutes'
import contactRoutes from './contactRoutes'
import authRoutes from './authRoutes'

const router = Router()

router.get('/config', (_req, res) => {
  res.json({ paystackPublicKey: env.paystackPublicKey })
})

router.use('/products', productRoutes)
router.use('/cart', cartRoutes)
router.use('/orders', orderRoutes)
router.use('/contact', contactRoutes)
router.use('/auth', authRoutes)

export default router
