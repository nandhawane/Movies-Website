import crypto from 'node:crypto'
import Booking from '../models/booking.model.js'
import Payment from '../models/payment.model.js'
export async function createPayment(req, res, next) { try { const booking = await Booking.findOne({ _id: req.body.bookingId, user: req.user._id }); if (!booking) return res.status(404).json({ message: 'Booking not found' }); const payment = await Payment.create({ booking: booking._id, user: req.user._id, amount: booking.amount, provider: 'mock', transactionId: `TXN-${crypto.randomBytes(6).toString('hex').toUpperCase()}`, status: 'success' }); booking.status = 'confirmed'; await booking.save(); res.status(201).json({ payment, booking }) } catch (error) { next(error) } }
export async function getPayment(req, res, next) { try { const payment = await Payment.findOne({ _id: req.params.id, user: req.user._id }).populate('booking'); if (!payment) return res.status(404).json({ message: 'Payment not found' }); res.json(payment) } catch (error) { next(error) } }
