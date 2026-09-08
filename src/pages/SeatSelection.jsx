import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import Seat from '../components/Seat'
import { useBooking } from '../context/BookingContext'
import { PageShell } from './PageShell'

export default function SeatSelection({ show, onBack, onContinue }) {
	const { selectedSeats, toggleSeat } = useBooking()
	const rows = ['A', 'B', 'C', 'D', 'E']
	return <PageShell title="Select your seats" eyebrow="STEP 1 OF 3" onBack={onBack}><div className="booking-summary"><span><CalendarDays size={16} /> {show ? new Date(show.startsAt).toLocaleDateString() : 'Date'}</span><span><Clock3 size={16} /> {show ? new Date(show.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time'}</span><b>{show?.movie?.title || 'Movie'}</b></div><div className="seat-selection-card"><div className="screen-line">SCREEN THIS WAY</div><div className="seat-map page-seat-map">{rows.map((row) => <div className="seat-row" key={row}><span>{row}</span>{Array.from({ length: show?.screen?.seatsPerRow || 8 }, (_, index) => { const id = `${row}${index + 1}`; const sold = show?.bookedSeats?.includes(id); return <Seat key={id} id={id} status={sold ? 'sold' : 'available'} selected={selectedSeats.includes(id)} onClick={toggleSeat} /> })}</div>)}</div></div><div className="seat-footer"><span>{selectedSeats.length} seats · ₹ {(selectedSeats.length * (show?.price || 0)).toLocaleString()}</span><button className="primary-button" disabled={!selectedSeats.length} onClick={onContinue}>Continue <ArrowRight size={16} /></button></div></PageShell>
}
