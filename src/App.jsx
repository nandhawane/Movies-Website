import { useState } from 'react'
import { ArrowRight, CalendarDays, ChevronDown, Clock3, Minus, Plus, ShieldCheck, Sparkles, X } from 'lucide-react'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'
import EventCard from './components/EventCard'
import TheatreCard from './components/TheatreCard'
import Seat from './components/Seat'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './admin/AdminPanel'
import Movies from './pages/Movies'
import Events from './pages/Events'
import Theatre from './pages/Theatre'
import MyBookings from './pages/MyBookings'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import BookingSuccess from './pages/BookingSuccess'
import { apiRequest } from './services/api'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import { BookingProvider, useBooking } from './context/BookingContext'

const movies = [
  { title: 'The Last Horizon', language: 'English', genre: 'Sci-fi · 2h 18m', rating: '8.7', format: 'IMAX', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85' },
  { title: 'Metro Nights', language: 'Hindi', genre: 'Drama · 2h 06m', rating: '8.2', format: '2D', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85' },
  { title: 'After the Rain', language: 'English', genre: 'Romance · 1h 54m', rating: '7.9', format: '2D', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85' },
  { title: 'The Wild Robot', language: 'English', genre: 'Animation · 1h 42m', rating: '8.6', format: '3D', poster: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=85' },
]
const events = [
  { title: 'Arijit Singh Live', type: 'LIVE MUSIC', date: 'Sat, 21 Sep', venue: 'Jio World Garden', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85' },
  { title: 'The Comedy Factory', type: 'COMEDY', date: 'Sun, 29 Sep', venue: 'Canvas Laugh Club', image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1000&q=85' },
  { title: 'Mumbai Film Week', type: 'FESTIVAL', date: '04 – 10 Oct', venue: 'NCPA, Nariman Point', image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=format&fit=crop&w=1000&q=85' },
]
const theatreList = [['PVR Icon, Phoenix', '1.8 km away', 'IMAX · Dolby Atmos'], ['INOX Megaplex, Malad', '4.2 km away', '4DX · Recliner'], ['Cinepolis, Andheri', '6.7 km away', 'IMAX · 3D']]

function AppContent() {
  const [authScreen, setAuthScreen] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [page, setPage] = useState('home')
  const [city, setCity] = useState('Mumbai')
  const [query, setQuery] = useState('')
  const [activeMovie, setActiveMovie] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [date, setDate] = useState('Today')
  const { selectedSeats, toggleSeat, selectedShow, setSelectedShow } = useBooking()
  const { user } = useAuth()
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
  async function openBooking(movie) {
    if (movie._id) {
      try {
        const shows = await apiRequest(`/shows?movie=${movie._id}`)
        if (!shows.length) return window.alert('No shows are scheduled for this movie yet.')
        setSelectedShow(shows[0])
        if (user) setPage('seats')
        else setAuthScreen('login')
      } catch (error) { window.alert(error.message) }
      return
    }
    setActiveMovie(movie)
    setShowBooking(true)
  }
  if (authScreen === 'login') return <Login onBack={() => setAuthScreen(null)} onRegister={() => setAuthScreen('register')} />
  if (authScreen === 'register') return <Register onBack={() => setAuthScreen(null)} onLogin={() => setAuthScreen('login')} />
  if (showAdmin && user?.role === 'admin') return <AdminPanel onClose={() => setShowAdmin(false)} />
  if (page === 'movies') return <Movies onBack={() => setPage('home')} onBook={openBooking} />
  if (page === 'events') return <Events onBack={() => setPage('home')} />
  if (page === 'theatres') return <Theatre onBack={() => setPage('home')} />
  if (page === 'bookings') return user ? <MyBookings onBack={() => setPage('home')} /> : <Login onBack={() => setPage('home')} onRegister={() => setAuthScreen('register')} />
  if (page === 'seats') return <SeatSelection show={selectedShow} onBack={() => setPage('home')} onContinue={() => setPage('checkout')} />
  if (page === 'checkout') return <Checkout onBack={() => setPage('seats')} onContinue={() => setPage('payment')} />
  if (page === 'payment') return <Payment onBack={() => setPage('checkout')} onComplete={() => setPage('success')} />
  if (page === 'success') return <BookingSuccess onBack={() => setPage('home')} />
  return <div>
    <Navbar city={city} setCity={setCity} onSearch={setQuery} user={user} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthScreen('login')} onBookings={() => setPage('bookings')} onMovies={() => setPage('movies')} onEvents={() => setPage('events')} onTheatres={() => setPage('theatres')} />
    <main id="home">
      <section className="hero"><div className="hero-backdrop" /><div className="hero-content"><span className="eyebrow"><Sparkles size={14} /> YOUR WEEKEND, SORTED</span><h1>Stories worth<br /><em>showing up for.</em></h1><p>Discover the latest movies, live events and experiences happening around {city}.</p><div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}>Explore what's on <ArrowRight size={17} /></button><button className="ghost-button" onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}>See live events</button></div></div><div className="hero-feature"><span>NOW SHOWING</span><strong>THE LAST<br />HORIZON</strong><small>★★★★★ &nbsp; 8.7 / 10</small><button onClick={() => openBooking(movies[0])}>Book now <ArrowRight size={15} /></button></div><div className="scroll-cue">SCROLL TO DISCOVER <span>↓</span></div></section>
      <section className="quick-bar"><div><CalendarDays size={18} /><span><small>WHEN</small><b>{date}</b></span><ChevronDown size={15} /></div><div><MapPinIcon /><span><small>WHERE</small><b>{city}</b></span><ChevronDown size={15} /></div><button onClick={() => document.getElementById('movies').scrollIntoView({ behavior: 'smooth' })}>Find experiences <ArrowRight size={16} /></button></section>
      <section className="content-section" id="movies"><div className="section-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2>Now showing</h2></div><a href="#movies">View all movies <ArrowRight size={15} /></a></div><div className="date-tabs">{['Today', 'Tomorrow', 'Wed, 18 Sep', 'Thu, 19 Sep'].map((item) => <button className={date === item ? 'active' : ''} onClick={() => setDate(item)} key={item}>{item}</button>)}</div><div className="movie-grid">{filteredMovies.map((movie) => <MovieCard key={movie.title} movie={movie} onBook={openBooking} />)}</div></section>
      <section className="event-band" id="events"><div className="content-section"><div className="section-heading light"><div><span className="section-kicker">MORE THAN MOVIES</span><h2>Make plans.</h2></div><a href="#events">All events <ArrowRight size={15} /></a></div><div className="event-grid">{events.map((event) => <EventCard key={event.title} event={event} />)}</div></div></section>
      <section className="content-section theatres-section" id="cinemas"><div className="section-heading"><div><span className="section-kicker">NEAR YOU</span><h2>Popular cinemas</h2></div><a href="#cinemas">See all cinemas <ArrowRight size={15} /></a></div><div className="theatre-grid">{theatreList.map((theatre) => <TheatreCard key={theatre[0]} name={theatre[0]} distance={theatre[1]} formats={theatre[2]} />)}</div></section>
      <section className="app-promo"><div><span className="section-kicker">CINEPASS ON THE GO</span><h2>Your plans, always<br /><em>within reach.</em></h2><p>Book faster, get handpicked recommendations and never miss a moment.</p><button className="dark-button">Get the app <ArrowRight size={16} /></button></div><div className="phone-art"><div className="phone-screen"><span>THIS WEEKEND</span><strong>Pick your<br />moment.</strong><div className="mini-poster" /></div></div></section>
    </main><Footer />
    {showBooking && <BookingModal movie={activeMovie} seats={selectedSeats} toggleSeat={toggleSeat} onClose={() => setShowBooking(false)} onContinue={() => { setShowBooking(false); if (!user) setAuthScreen('login'); else window.alert('Please choose a show from the Movies page to continue.') }} />}
  </div>
}
function MapPinIcon() { return <span className="map-pin">⌖</span> }
function BookingModal({ movie, seats, toggleSeat, onClose, onContinue }) { const rows = ['A', 'B', 'C', 'D', 'E']; return <div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}><div className="booking-modal"><button className="close-modal" onClick={onClose}><X size={19} /></button><div className="modal-top"><div><span className="section-kicker">BOOK TICKETS</span><h2>{movie.title}</h2><p><Clock3 size={14} /> 2h 18m · English · IMAX</p></div><div className="modal-date"><CalendarDays size={17} /><b>Today</b><span>18 Sep</span></div></div><div className="showtimes"><span>SELECT SHOWTIME</span><button className="showtime active">10:15 AM<small>₹ 280</small></button><button className="showtime">01:30 PM<small>₹ 320</small></button><button className="showtime">06:45 PM<small>₹ 380</small></button></div><div className="seat-area"><span className="seat-label">SELECT YOUR SEATS <small>{seats.length} selected</small></span><div className="screen-line">SCREEN THIS WAY</div><div className="seat-map">{rows.map((row) => <div className="seat-row" key={row}><span>{row}</span>{Array.from({ length: 8 }, (_, index) => { const id = `${row}${index + 1}`; return <Seat key={id} id={id} status={id === 'C4' || id === 'D5' ? 'sold' : 'available'} selected={seats.includes(id)} onClick={toggleSeat} /> })}</div>)}</div><div className="seat-legend"><span><i className="available-dot" /> Available</span><span><i className="selected-dot" /> Selected</span><span><i className="sold-dot" /> Sold</span></div></div><div className="modal-bottom"><div><small>TOTAL</small><strong>₹ {seats.length * 280}</strong><span><ShieldCheck size={13} /> Secure checkout</span></div><button className="primary-button" disabled={!seats.length} onClick={onContinue}>Continue <ArrowRight size={16} /></button></div></div></div> }
export default function App() { return <AuthProvider><BookingProvider><AppContent /></BookingProvider></AuthProvider> }
