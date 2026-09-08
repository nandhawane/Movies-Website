import { MapPin, Search, Ticket, UserRound } from 'lucide-react'

export default function Navbar({ city, setCity, onSearch, onSignIn, onBookings, onMovies, onEvents, onTheatres, user, onAdmin }) {
  return <header className="topbar">
    <a className="brand" href="#home"><span className="brand-mark">C</span><span>Cine<span>Pass</span></span></a>
    <div className="location-picker"><MapPin size={16} /><select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Choose city"><option>Mumbai</option><option>Delhi NCR</option><option>Bengaluru</option><option>Hyderabad</option></select></div>
    <label className="searchbox"><Search size={17} /><input onChange={(event) => onSearch(event.target.value)} placeholder="Search for movies, events or artists" /></label>
    <nav className="nav-links"><button onClick={onMovies}>Movies</button><button onClick={onEvents}>Events</button><button onClick={onTheatres}>Cinemas</button></nav>
    <button className="icon-button" aria-label="My bookings" onClick={onBookings}><Ticket size={19} /></button><button className="profile-button" onClick={user?.role === 'admin' ? onAdmin : onSignIn}><UserRound size={17} /> {user?.role === 'admin' ? 'Admin' : user ? user.name : 'Sign in'}</button>
  </header>
}
