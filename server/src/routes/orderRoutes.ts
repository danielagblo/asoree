import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'

const router = Router()
const ctrl = new OrderController()

router.post('/initialize', ctrl.initialize.bind(ctrl))
router.post('/verify', ctrl.verify.bind(ctrl))
router.get('/:id', ctrl.findById.bind(ctrl))

export default router
