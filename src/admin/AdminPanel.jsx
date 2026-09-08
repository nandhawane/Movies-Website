import { useEffect, useState } from 'react'
import { BarChart3, Building2, CalendarDays, Film, LayoutDashboard, LogOut, Plus, RefreshCw, Ticket, Users as UsersIcon, X } from 'lucide-react'
import { apiRequest } from '../services/api'

const sections = [
  ['overview', 'Overview', LayoutDashboard],
  ['movies', 'Movies', Film],
  ['shows', 'Shows', CalendarDays],
  ['theatres', 'Theatres', Building2],
  ['bookings', 'Bookings', Ticket],
  ['users', 'Users', UsersIcon],
]

const emptyMovie = { title: '', language: 'English', rating: 0, duration: '', poster: '', releaseDate: '' }
const emptyTheatre = { name: '', city: 'Mumbai', address: '' }
const emptyShow = { movie: '', screen: '', startsAt: '', price: 280 }

export default function AdminPanel({ onClose }) {
  const [active, setActive] = useState('overview')
  const [data, setData] = useState({ movies: [], shows: [], theatres: [], bookings: [], users: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const [movies, shows, theatres, bookings, users] = await Promise.all([
        apiRequest('/movies'), apiRequest('/shows'), apiRequest('/theatres'), apiRequest('/bookings/all'), apiRequest('/users'),
      ])
      setData({ movies, shows, theatres, bookings, users })
    } catch (requestError) { setError(requestError.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  async function saveEntity(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const endpoint = form.type === 'movie' ? '/movies' : form.type === 'theatre' ? '/theatres' : '/shows'
      const body = { ...form.values }
      if (form.type === 'movie') { body.rating = Number(body.rating); body.duration = Number(body.duration) || undefined }
      if (form.type === 'show') { body.price = Number(body.price); body.startsAt = new Date(body.startsAt).toISOString() }
      await apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) })
      setForm(null)
      await loadData()
    } catch (requestError) { setError(requestError.message) }
    finally { setSaving(false) }
  }

  async function removeMovie(movieId) {
    if (!window.confirm('Remove this movie from the catalogue?')) return
    try { await apiRequest(`/movies/${movieId}`, { method: 'DELETE' }); await loadData() }
    catch (requestError) { setError(requestError.message) }
  }

  function openForm(type) { setForm({ type, values: type === 'movie' ? emptyMovie : type === 'theatre' ? emptyTheatre : emptyShow }) }
  function updateForm(event) { setForm({ ...form, values: { ...form.values, [event.target.name]: event.target.value } }) }

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-logo"><span className="brand-mark">C</span><strong>Cine<span>Pass</span></strong></div>
      <p className="admin-caption">OPERATIONS CENTER</p>
      <nav>{sections.map(([id, label, Icon]) => <button className={active === id ? 'active' : ''} key={id} onClick={() => setActive(id)}><Icon size={17} /> {label}</button>)}</nav>
      <button className="admin-exit" onClick={onClose}><LogOut size={16} /> Back to site</button>
    </aside>
    <section className="admin-content">
      <header className="admin-header"><div><span className="section-kicker">CINEPASS ADMIN</span><h1>{sections.find(([id]) => id === active)?.[1]}</h1></div><button className="admin-refresh" onClick={loadData}><RefreshCw size={16} /> Refresh</button></header>
      {error && <div className="admin-error">{error}</div>}
      {loading ? <div className="admin-loading">Loading admin data...</div> : <>
        {active === 'overview' && <Overview data={data} onNavigate={setActive} />}
        {active === 'movies' && <Movies data={data} onAdd={() => openForm('movie')} onRemove={removeMovie} />}
        {active === 'shows' && <Shows data={data} onAdd={() => openForm('show')} />}
        {active === 'theatres' && <Theatres data={data} onAdd={() => openForm('theatre')} />}
        {active === 'bookings' && <Bookings data={data} />}
        {active === 'users' && <Users data={data} />}
      </>}
    </section>
    {form && <FormModal form={form} saving={saving} onChange={updateForm} onSubmit={saveEntity} onClose={() => setForm(null)} data={data} />}
  </main>
}

function Overview({ data, onNavigate }) {
  const cards = [['movies', 'Movies', data.movies.length, Film], ['shows', 'Scheduled shows', data.shows.length, CalendarDays], ['bookings', 'Total bookings', data.bookings.length, Ticket], ['users', 'Registered users', data.users.length, UsersIcon]]
  return <div className="admin-overview"><div className="admin-stat-grid">{cards.map(([id, label, value, Icon]) => <button className="admin-stat" key={id} onClick={() => onNavigate(id)}><Icon size={19} /><span>{label}</span><strong>{value}</strong><small>View details →</small></button>)}</div><div className="admin-section-grid"><section className="admin-card"><div className="admin-card-heading"><div><span className="section-kicker">RECENT ACTIVITY</span><h2>Latest bookings</h2></div><BarChart3 size={20} /></div><BookingRows bookings={data.bookings.slice(0, 5)} /></section><section className="admin-card"><div className="admin-card-heading"><div><span className="section-kicker">QUICK ACTIONS</span><h2>Manage catalogue</h2></div></div><div className="quick-actions"><button onClick={() => onNavigate('movies')}><Film size={18} /> Manage movies</button><button onClick={() => onNavigate('shows')}><CalendarDays size={18} /> Schedule show</button><button onClick={() => onNavigate('theatres')}><Building2 size={18} /> Add theatre</button></div></section></div></div>
}

function Movies({ data, onAdd, onRemove }) { return <AdminTable title="Movie catalogue" action="Add movie" onAdd={onAdd} headers={['Title', 'Language', 'Rating', 'Duration', 'Status', '']} rows={data.movies.map((movie) => [<strong>{movie.title}</strong>, movie.language, movie.rating || '0.0', movie.duration ? `${movie.duration} min` : '-', <span className="status active">Active</span>, <button className="table-action danger" onClick={() => onRemove(movie._id)}>Remove</button>])} /> }
function Shows({ data, onAdd }) { return <AdminTable title="Show schedule" action="Schedule show" onAdd={onAdd} headers={['Movie', 'Screen', 'Starts', 'Price', 'Seats']} rows={data.shows.map((show) => [<strong>{show.movie?.title || 'Unknown movie'}</strong>, show.screen?.name || 'Unknown screen', new Date(show.startsAt).toLocaleString(), `₹ ${show.price}`, `${show.bookedSeats?.length || 0} booked`])} /> }
function Theatres({ data, onAdd }) { return <AdminTable title="Cinema locations" action="Add theatre" onAdd={onAdd} headers={['Name', 'City', 'Address', 'Status']} rows={data.theatres.map((theatre) => [<strong>{theatre.name}</strong>, theatre.city, theatre.address || '-', <span className="status active">Active</span>])} /> }
function Bookings({ data }) { return <AdminTable title="All bookings" headers={['Booking', 'Customer', 'Movie', 'Seats', 'Amount', 'Status']} rows={data.bookings.map((booking) => [<strong>{booking.bookingCode}</strong>, booking.user?.email || '-', booking.show?.movie?.title || 'Show', booking.seats?.join(', '), `₹ ${booking.amount}`, <span className={`status ${booking.status}`}>{booking.status}</span>])} /> }
function Users({ data }) { return <AdminTable title="Registered users" headers={['Name', 'Email', 'Role', 'Joined']} rows={data.users.map((user) => [<strong>{user.name}</strong>, user.email, <span className="status">{user.role}</span>, new Date(user.createdAt).toLocaleDateString()])} /> }
function BookingRows({ bookings }) { return <div className="booking-rows">{bookings.length ? bookings.map((booking) => <div className="booking-row" key={booking._id}><span>{booking.bookingCode}</span><strong>{booking.user?.email || 'Customer'}</strong><b>₹ {booking.amount}</b></div>) : <p className="empty-state">No bookings yet.</p>}</div> }
function AdminTable({ title, action, onAdd, headers, rows }) { return <section className="admin-card admin-table-card"><div className="admin-card-heading"><div><span className="section-kicker">DATA MANAGEMENT</span><h2>{title}</h2></div>{action && <button className="admin-primary" onClick={onAdd}><Plus size={16} /> {action}</button>}</div>{rows.length ? <div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div> : <p className="empty-state">Nothing to show yet.</p>}</section> }

function FormModal({ form, saving, onChange, onSubmit, onClose, data }) {
  const labels = form.type === 'movie' ? ['title', 'language', 'rating', 'duration', 'poster', 'releaseDate'] : form.type === 'theatre' ? ['name', 'city', 'address'] : ['movie', 'screen', 'startsAt', 'price']
  return <div className="admin-modal-backdrop"><form className="admin-form-modal" onSubmit={onSubmit}><button type="button" className="admin-modal-close" onClick={onClose}><X size={18} /></button><span className="section-kicker">NEW {form.type.toUpperCase()}</span><h2>Add {form.type}</h2>{labels.map((field) => <label key={field}>{field.replace(/([A-Z])/g, ' $1')}<Field field={field} value={form.values[field]} onChange={onChange} data={data} type={form.type} /></label>)}<button className="admin-primary full" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></form></div>
}
function Field({ field, value, onChange, data, type }) {
  if (type === 'show' && field === 'movie') return <select name={field} value={value} onChange={onChange} required><option value="">Select movie</option>{data.movies.map((movie) => <option key={movie._id} value={movie._id}>{movie.title}</option>)}</select>
  if (type === 'show' && field === 'startsAt') return <input name={field} type="datetime-local" value={value} onChange={onChange} required />
  return <input name={field} type={field === 'rating' || field === 'duration' || field === 'price' ? 'number' : 'text'} value={value || ''} onChange={onChange} required={['title', 'name', 'language', 'movie', 'screen', 'startsAt', 'price'].includes(field)} />
}
