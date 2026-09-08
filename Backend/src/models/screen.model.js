import mongoose from 'mongoose'

const screenSchema = new mongoose.Schema({
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  name: { type: String, required: true },
  rows: { type: Number, default: 5 },
  seatsPerRow: { type: Number, default: 8 },
  format: { type: String, default: '2D' },
}, { timestamps: true })

export default mongoose.model('Screen', screenSchema)
