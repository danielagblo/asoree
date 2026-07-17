import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const router = Router()
const ctrl = new AuthController()

router.post('/login', ctrl.login.bind(ctrl))

export default router
