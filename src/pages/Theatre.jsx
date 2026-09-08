import { useEffect, useState } from 'react'
import TheatreCard from '../components/TheatreCard'
import { apiRequest } from '../services/api'
import { ErrorState, LoadingState, PageShell } from './PageShell'

export default function Theatre({ onBack }) {
	const [theatres, setTheatres] = useState(null)
	const [error, setError] = useState('')
	useEffect(() => { apiRequest('/theatres').then(setTheatres).catch((e) => setError(e.message)) }, [])
	return <PageShell title="Cinemas near you" eyebrow="FIND YOUR SEAT" onBack={onBack}>{error ? <ErrorState message={error} /> : !theatres ? <LoadingState /> : <div className="theatre-grid page-theatre-grid">{theatres.map((theatre) => <TheatreCard key={theatre._id} name={theatre.name} distance={theatre.city} formats={(theatre.amenities || []).join(' · ')} />)}</div>}</PageShell>
}
