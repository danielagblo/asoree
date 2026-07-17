import { Router } from 'express'
import { CartController } from '../controllers/CartController'

const router = Router()
const ctrl = new CartController()

router.get('/:token', ctrl.getCart.bind(ctrl))
router.post('/:token/items', ctrl.addItem.bind(ctrl))
router.delete('/:token/items/:itemId', ctrl.removeItem.bind(ctrl))
router.delete('/:token', ctrl.clearCart.bind(ctrl))

export default router
