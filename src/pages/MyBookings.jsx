import { useEffect, useState } from 'react'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { apiRequest } from '../services/api'
import { EmptyState, ErrorState, LoadingState, PageShell } from './PageShell'

export default function MyBookings({ onBack }) {
	const [bookings, setBookings] = useState(null)
	const [error, setError] = useState('')
	useEffect(() => { apiRequest('/bookings/mine').then(setBookings).catch((e) => setError(e.message)) }, [])
	return <PageShell title="My bookings" eyebrow="YOUR PLANS" onBack={onBack}>{error ? <ErrorState message={error} /> : !bookings ? <LoadingState /> : bookings.length ? <div className="booking-history">{bookings.map((booking) => <article className="history-card" key={booking._id}><div className="history-icon"><Ticket size={22} /></div><div><span className="status {booking.status}">{booking.status}</span><h2>{booking.show?.movie?.title || 'Movie booking'}</h2><p><CalendarDays size={14} /> {booking.show?.startsAt ? new Date(booking.show.startsAt).toLocaleString() : 'Showtime'} </p><p><MapPin size={14} /> {booking.show?.screen?.name || 'Cinema screen'} · Seats {booking.seats.join(', ')}</p></div><strong>₹ {booking.amount}</strong></article>)}</div> : <EmptyState><Ticket size={30} /><p>No bookings yet. Pick a movie and make a plan.</p></EmptyState>}</PageShell>
}
