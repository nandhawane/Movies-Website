import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' })
    const token = header.slice(7)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(payload.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'User no longer exists' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
