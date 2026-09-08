import crypto from 'node:crypto'
import Booking from '../models/booking.model.js'
import Show from '../models/show.model.js'

export async function createBooking(req, res, next) {
  try {
    const { showId, seats } = req.body
    if (!showId || !Array.isArray(seats) || !seats.length) return res.status(400).json({ message: 'Show and at least one seat are required' })
    const show = await Show.findOneAndUpdate({ _id: showId, status: 'scheduled', bookedSeats: { $nin: seats } }, { $addToSet: { bookedSeats: { $each: seats } } }, { new: true })
    if (!show) return res.status(409).json({ message: 'One or more selected seats are no longer available' })
    const booking = await Booking.create({ user: req.user._id, show: showId, seats, amount: seats.length * show.price, status: 'pending', bookingCode: `CP-${crypto.randomBytes(4).toString('hex').toUpperCase()}` })
    res.status(201).json(await booking.populate({ path: 'show', populate: { path: 'movie screen' } }))
  } catch (error) { next(error) }
}
export async function myBookings(req, res, next) { try { res.json(await Booking.find({ user: req.user._id }).populate({ path: 'show', populate: { path: 'movie screen' } }).sort({ createdAt: -1 })) } catch (error) { next(error) } }
export async function getBooking(req, res, next) { try { const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('show'); if (!booking) return res.status(404).json({ message: 'Booking not found' }); res.json(booking) } catch (error) { next(error) } }
export async function cancelBooking(req, res, next) { try { const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }); if (!booking) return res.status(404).json({ message: 'Booking not found' }); if (booking.status === 'cancelled') return res.json(booking); await Show.findByIdAndUpdate(booking.show, { $pull: { bookedSeats: { $in: booking.seats } } }); booking.status = 'cancelled'; await booking.save(); res.json(booking) } catch (error) { next(error) } }
export async function allBookings(req, res, next) { try { res.json(await Booking.find().populate('user show').sort({ createdAt: -1 })) } catch (error) { next(error) } }
