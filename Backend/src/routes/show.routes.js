import { Router } from 'express'
import { createShow, getShow, listShows, updateShow } from '../controllers/show.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.get('/', listShows)
router.get('/:id', getShow)
router.post('/', protect, adminOnly, createShow)
router.patch('/:id', protect, adminOnly, updateShow)
export default router
