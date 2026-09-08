import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

function tokenFor(user) { return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' }) }

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Name, valid email and a 6+ character password are required' })
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email is already registered' })
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) })
    res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) { next(error) }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' })
    res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) { next(error) }
}

export function profile(req, res) { res.json({ user: req.user }) }

export async function listUsers(req, res, next) {
  try { res.json(await User.find().select('-password').sort({ createdAt: -1 })) }
  catch (error) { next(error) }
}
