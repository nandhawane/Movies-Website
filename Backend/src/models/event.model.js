import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
  image: String,
  venue: String,
  city: String,
  startsAt: Date,
  endsAt: Date,
  price: Number,
  seatsAvailable: Number,
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Event', eventSchema)
