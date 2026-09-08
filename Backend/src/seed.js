import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDatabase } from './config/db.js'
import Movie from './models/movie.model.js'
import Theatre from './models/theatre.model.js'
import Screen from './models/screen.model.js'
import Show from './models/show.model.js'

await connectDatabase()
await Promise.all([Movie.deleteMany({}), Theatre.deleteMany({}), Screen.deleteMany({}), Show.deleteMany({})])

const [movieOne, movieTwo] = await Movie.create([
  { title: 'The Last Horizon', description: 'A crew searches for a new home beyond the stars.', language: 'English', genre: ['Sci-fi', 'Adventure'], duration: 138, rating: 8.7, poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85', releaseDate: new Date() },
  { title: 'Metro Nights', description: 'One city, three lives, one unforgettable night.', language: 'Hindi', genre: ['Drama'], duration: 126, rating: 8.2, poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85', releaseDate: new Date() },
])
const theatre = await Theatre.create({ name: 'PVR Icon, Phoenix', city: 'Mumbai', address: 'Lower Parel, Mumbai', amenities: ['IMAX', 'Dolby Atmos', 'Recliner'] })
const screen = await Screen.create({ theatre: theatre._id, name: 'Screen 1', rows: 5, seatsPerRow: 8, format: 'IMAX' })
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
await Show.create([
  { movie: movieOne._id, screen: screen._id, startsAt: new Date(tomorrow.setHours(10, 15, 0, 0)), price: 280 },
  { movie: movieOne._id, screen: screen._id, startsAt: new Date(tomorrow.setHours(18, 45, 0, 0)), price: 380 },
  { movie: movieTwo._id, screen: screen._id, startsAt: new Date(tomorrow.setHours(13, 30, 0, 0)), price: 220 },
])
console.log('CinePass sample data seeded')
await mongoose.disconnect()
