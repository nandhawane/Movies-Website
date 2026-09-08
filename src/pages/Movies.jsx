import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { apiRequest } from '../services/api'
import { EmptyState, ErrorState, LoadingState, PageShell } from './PageShell'

export default function Movies({ onBack, onBook, movies: initialMovies }) {
	const [movies, setMovies] = useState(initialMovies || [])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(!initialMovies)
	const [error, setError] = useState('')
	useEffect(() => { if (!initialMovies) apiRequest('/movies').then(setMovies).catch((e) => setError(e.message)).finally(() => setLoading(false)) }, [initialMovies])
	const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
	return <PageShell title="Movies" eyebrow="WHAT'S ON" onBack={onBack}><div className="page-toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies" /><span>{filtered.length} titles</span></div>{loading ? <LoadingState /> : error ? <ErrorState message={error} /> : filtered.length ? <div className="movie-grid page-movie-grid">{filtered.map((movie) => <MovieCard key={movie._id || movie.title} movie={{ ...movie, genre: Array.isArray(movie.genre) ? movie.genre.join(' · ') : movie.genre }} onBook={onBook} />)}</div> : <EmptyState>No movies match your search.</EmptyState>}</PageShell>
}
