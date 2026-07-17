import { Router } from 'express'
import multer from 'multer'
import { ProductController } from '../controllers/ProductController'
import { requireAdmin } from '../middleware/auth'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

const router = Router()
const ctrl = new ProductController()

router.get('/', ctrl.findAll.bind(ctrl))
router.get('/:id', ctrl.findById.bind(ctrl))
router.post('/', requireAdmin, upload.single('image'), ctrl.create.bind(ctrl))
router.put('/:id', requireAdmin, upload.single('image'), ctrl.update.bind(ctrl))
router.delete('/:id', requireAdmin, ctrl.delete.bind(ctrl))

export default router
