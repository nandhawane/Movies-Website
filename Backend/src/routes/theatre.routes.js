import { Router } from 'express'
import { createScreen, createTheatre, getTheatre, listTheatres } from '../controllers/theatre.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.get('/', listTheatres)
router.get('/:id', getTheatre)
router.post('/', protect, adminOnly, createTheatre)
router.post('/:theatreId/screens', protect, adminOnly, createScreen)
export default router
