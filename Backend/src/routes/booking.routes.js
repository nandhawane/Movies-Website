import { Router } from 'express'
import { allBookings, cancelBooking, createBooking, getBooking, myBookings } from '../controllers/booking.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.use(protect)
router.post('/', createBooking)
router.get('/mine', myBookings)
router.get('/all', adminOnly, allBookings)
router.get('/:id', getBooking)
router.patch('/:id/cancel', cancelBooking)
export default router
