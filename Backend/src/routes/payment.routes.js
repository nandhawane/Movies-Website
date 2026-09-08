import { Router } from 'express'
import { createPayment, getPayment } from '../controllers/payment.controller.js'
import { protect } from '../middleware/auth.middleware.js'
const router = Router()
router.use(protect)
router.post('/', createPayment)
router.get('/:id', getPayment)
export default router
