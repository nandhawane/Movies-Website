import { ArrowRight, ShieldCheck } from 'lucide-react'
import { apiRequest } from '../services/api'
import { useBooking } from '../context/BookingContext'
import { PageShell } from './PageShell'

export default function Checkout({ onBack, onContinue }) {
	const { selectedShow, selectedSeats, setCurrentBooking } = useBooking()
	const total = selectedSeats.length * (selectedShow?.price || 0)
	async function reserve() { const booking = await apiRequest('/bookings', { method: 'POST', body: JSON.stringify({ showId: selectedShow._id, seats: selectedSeats }) }); setCurrentBooking(booking); onContinue() }
	return <PageShell title="Review your booking" eyebrow="STEP 2 OF 3" onBack={onBack}><div className="checkout-card"><div><span className="section-kicker">YOUR SELECTION</span><h2>{selectedShow?.movie?.title || 'Movie'}</h2><p>{selectedShow?.screen?.name || 'Screen'} · {selectedSeats.join(', ')}</p><p>Total payable <strong>₹ {total.toLocaleString()}</strong></p></div><div className="secure-note"><ShieldCheck size={19} /> Secure reservation<br /><small>Your seats will be held while you complete payment.</small></div><button className="primary-button" onClick={reserve}>Continue to payment <ArrowRight size={16} /></button></div></PageShell>
}
