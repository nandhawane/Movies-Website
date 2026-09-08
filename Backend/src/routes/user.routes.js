import { Router } from 'express'
import { listUsers, login, profile, register } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, profile)
router.get('/', protect, adminOnly, listUsers)
export default router
