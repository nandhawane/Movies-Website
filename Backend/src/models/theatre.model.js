import mongoose from 'mongoose'

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true, index: true },
  address: String,
  location: { lat: Number, lng: Number },
  amenities: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Theatre', theatreSchema)
