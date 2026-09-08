import { Heart, Play, Star } from 'lucide-react'

export default function MovieCard({ movie, onBook }) {
  return <article className="movie-card">
    <div className="poster-wrap"><img src={movie.poster} alt={movie.title} /><button className="poster-play" aria-label={`Play trailer for ${movie.title}`}><Play size={15} fill="currentColor" /></button><span className="format-tag">{movie.format}</span></div>
    <div className="movie-info"><div className="rating"><Star size={14} fill="currentColor" /> {movie.rating}</div><button className="heart" aria-label="Add to favourites"><Heart size={17} /></button><h3>{movie.title}</h3><p>{movie.language} · {movie.genre}</p><button className="book-link" onClick={() => onBook(movie)}>Book tickets <span>→</span></button></div>
  </article>
}
