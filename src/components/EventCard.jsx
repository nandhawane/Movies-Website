export default function EventCard({ event }) {
  return <article className="event-card"><img src={event.image} alt={event.title} /><div className="event-shade" /><div className="event-copy"><span>{event.type}</span><h3>{event.title}</h3><p>{event.date} · {event.venue}</p><button>View details <b>↗</b></button></div></article>
}
