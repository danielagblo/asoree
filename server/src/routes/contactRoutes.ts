import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'
import { requireAdmin } from '../middleware/auth'

const router = Router()
const ctrl = new ContactController()

router.post('/', ctrl.create.bind(ctrl))
router.get('/', requireAdmin, ctrl.findAll.bind(ctrl))

export default router
