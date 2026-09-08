import { CheckCircle2, Home, Ticket } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { PageShell } from './PageShell'

export default function BookingSuccess({ onBack }) { const { currentBooking, clearSelection } = useBooking(); function done() { clearSelection(); onBack() }; return <PageShell title="You're all set" eyebrow="BOOKING CONFIRMED" onBack={done}><div className="success-card"><CheckCircle2 size={52} /><h2>Your tickets are confirmed.</h2><p>Show these details at the cinema entrance.</p><div className="ticket-code"><Ticket size={18} /><strong>{currentBooking?.bookingCode || 'CINEPASS'}</strong></div><div className="success-details"><span>Seats <b>{currentBooking?.seats?.join(', ') || '-'}</b></span><span>Amount <b>₹ {currentBooking?.amount || 0}</b></span></div><button className="primary-button" onClick={done}><Home size={16} /> Back to home</button></div></PageShell> }
