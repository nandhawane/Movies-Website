import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import movieRoutes from './routes/movie.routes.js'
import theatreRoutes from './routes/theatre.routes.js'
import showRoutes from './routes/show.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import eventRoutes from './routes/event.routes.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'cinepass-api' }))
app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/theatres', theatreRoutes)
app.use('/api/shows', showRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/events', eventRoutes)
app.use((req, res) => res.status(404).json({ message: 'Route not found' }))
app.use((error, req, res, next) => { console.error(error); res.status(error.status || 500).json({ message: error.message || 'Internal server error' }) })
export default app
