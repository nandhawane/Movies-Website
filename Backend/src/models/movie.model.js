import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  language: { type: String, required: true },
  genre: [String],
  duration: Number,
  rating: { type: Number, min: 0, max: 10, default: 0 },
  poster: String,
  trailerUrl: String,
  releaseDate: Date,
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Movie', movieSchema)
