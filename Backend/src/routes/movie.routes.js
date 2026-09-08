import { Router } from 'express'
import { createMovie, deleteMovie, getMovie, listMovies, updateMovie } from '../controllers/movie.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
const router = Router()
router.get('/', listMovies)
router.get('/:id', getMovie)
router.post('/', protect, adminOnly, createMovie)
router.patch('/:id', protect, adminOnly, updateMovie)
router.delete('/:id', protect, adminOnly, deleteMovie)
export default router
