import { useState } from 'react'
import { CreditCard, LockKeyhole } from 'lucide-react'
import { apiRequest } from '../services/api'
import { useBooking } from '../context/BookingContext'
import { PageShell } from './PageShell'

export default function Payment({ onBack, onComplete }) {
	const { currentBooking } = useBooking()
	const [busy, setBusy] = useState(false)
	async function pay() { setBusy(true); try { await apiRequest('/payments', { method: 'POST', body: JSON.stringify({ bookingId: currentBooking._id }) }); onComplete() } finally { setBusy(false) } }
	return <PageShell title="Payment" eyebrow="STEP 3 OF 3" onBack={onBack}><div className="payment-card"><div className="payment-heading"><CreditCard size={21} /><h2>Card payment</h2></div><label>Card number<input placeholder="4242 4242 4242 4242" inputMode="numeric" required /></label><div className="payment-fields"><label>Expiry<input placeholder="MM / YY" required /></label><label>CVV<input placeholder="•••" required /></label></div><button className="primary-button" disabled={busy} onClick={pay}><LockKeyhole size={16} /> {busy ? 'Processing...' : `Pay ₹ ${currentBooking?.amount || 0}`}</button><p className="payment-disclaimer">This is a secure demo payment. No real card is charged.</p></div></PageShell>
}
