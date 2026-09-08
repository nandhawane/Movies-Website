import { Router } from 'express'
import { createEvent, getEvent, listEvents, updateEvent } from '../controllers/event.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.get('/', listEvents)
router.get('/:id', getEvent)
router.post('/', protect, adminOnly, createEvent)
router.patch('/:id', protect, adminOnly, updateEvent)
export default router
