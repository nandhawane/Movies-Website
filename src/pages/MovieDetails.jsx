import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, Star } from 'lucide-react'
import { apiRequest } from '../services/api'
import { ErrorState, LoadingState, PageShell } from './PageShell'

export default function MovieDetails({ movie, onBack, onSelectShow }) {
	const [shows, setShows] = useState(null)
	const [error, setError] = useState('')
	useEffect(() => { if (movie?._id) apiRequest(`/shows?movie=${movie._id}`).then(setShows).catch((e) => setError(e.message)) }, [movie])
	if (!movie) return <PageShell title="Movie not found" eyebrow="CINEPASS" onBack={onBack}><ErrorState message="Choose a movie to continue." /></PageShell>
	return <PageShell title={movie.title} eyebrow="MOVIE DETAILS" onBack={onBack}><div className="detail-hero"><img src={movie.poster} alt={movie.title} /><div><div className="rating"><Star size={15} fill="currentColor" /> {movie.rating || '0.0'} / 10</div><p>{movie.language} · {(movie.genre || []).join?.(' · ') || movie.genre} · <Clock3 size={14} /> {movie.duration || 0} min</p><p className="detail-description">{movie.description || 'Book your seats for this experience and make your next outing count.'}</p></div></div><div className="show-list"><h2><CalendarDays size={20} /> Select a showtime</h2>{error ? <ErrorState message={error} /> : !shows ? <LoadingState /> : shows.length ? shows.map((show) => <button className="show-list-item" key={show._id} onClick={() => onSelectShow(show)}><span>{new Date(show.startsAt).toLocaleString()}</span><b>{show.screen?.name || 'Screen'} · ₹ {show.price}</b></button>) : <p className="page-state">No shows scheduled yet.</p>}</div></PageShell>
}
