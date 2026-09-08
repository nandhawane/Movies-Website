import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { apiRequest } from '../services/api'
import { EmptyState, ErrorState, LoadingState, PageShell } from './PageShell'

export default function Events({ onBack, events: initialEvents }) {
	const [events, setEvents] = useState(initialEvents || [])
	const [error, setError] = useState('')
	useEffect(() => { if (!initialEvents) apiRequest('/events').then(setEvents).catch((e) => setError(e.message)) }, [initialEvents])
	return <PageShell title="Live events" eyebrow="MORE THAN MOVIES" onBack={onBack}>{error ? <ErrorState message={error} /> : !events.length ? <LoadingState /> : <div className="event-grid page-event-grid">{events.map((event) => <EventCard key={event._id || event.title} event={event} />)}</div>}</PageShell>
}
