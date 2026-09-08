import mongoose from 'mongoose'

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  startsAt: { type: Date, required: true, index: true },
  endsAt: Date,
  price: { type: Number, required: true, min: 0 },
  bookedSeats: { type: [String], default: [] },
  status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' },
}, { timestamps: true })

export default mongoose.model('Show', showSchema)
