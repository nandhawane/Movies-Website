import { useState } from 'react'
import { ArrowLeft, ArrowRight, LoaderCircle, LockKeyhole, Mail, Ticket, UserRound } from 'lucide-react'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Register({ onBack, onLogin }) {
	const { setUser } = useAuth()
	const [form, setForm] = useState({ name: '', email: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(event) {
		event.preventDefault()
		setError('')
		setLoading(true)
		try {
			const response = await apiRequest('/users/register', { method: 'POST', body: JSON.stringify(form) })
			setUser(response.user, response.token)
			onBack()
		} catch (requestError) {
			setError(requestError.message)
		} finally {
			setLoading(false)
		}
	}

	function updateField(event) { setForm({ ...form, [event.target.name]: event.target.value }) }

	return <main className="auth-page">
		<button className="auth-back" onClick={onBack}><ArrowLeft size={16} /> Back to home</button>
		<section className="auth-panel">
			<div className="auth-brand"><span className="brand-mark"><Ticket size={17} /></span><strong>Cine<span>Pass</span></strong></div>
			<span className="section-kicker">JOIN CINEPASS</span>
			<h1>Make room for<br /><em>better plans.</em></h1>
			<p className="auth-intro">Create an account to book seats, save your plans and manage every outing.</p>
			<form onSubmit={handleSubmit} className="auth-form">
				<label>Your name<div className="auth-input"><UserRound size={17} /><input name="name" value={form.name} onChange={updateField} placeholder="Your full name" required /></div></label>
				<label>Email address<div className="auth-input"><Mail size={17} /><input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></div></label>
				<label>Password<div className="auth-input"><LockKeyhole size={17} /><input name="password" type="password" value={form.password} onChange={updateField} placeholder="At least 6 characters" required minLength="6" /></div></label>
				{error && <p className="auth-error" role="alert">{error}</p>}
				<button className="primary-button auth-submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={17} /> Creating account...</> : <>Create account <ArrowRight size={17} /></>}</button>
			</form>
			<p className="auth-switch">Already have an account? <button onClick={onLogin}>Sign in</button></p>
		</section>
	</main>
}
