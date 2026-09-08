import { CalendarDays, MapPin } from 'lucide-react'
import { PageShell } from './PageShell'

export default function EventDetails({ event, onBack }) { return <PageShell title={event?.title || 'Event details'} eyebrow={event?.type || 'EVENT'} onBack={onBack}><div className="event-detail"><img src={event?.image} alt={event?.title} /><div><h2>{event?.title}</h2><p><CalendarDays size={15} /> {event?.date || 'Date to be announced'}</p><p><MapPin size={15} /> {event?.venue || 'Venue to be announced'}</p><button className="primary-button">Book event tickets <span>→</span></button></div></div></PageShell> }
