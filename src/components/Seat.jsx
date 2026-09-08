import { Check } from 'lucide-react'
export default function Seat({ id, status, selected, onClick }) {
  const unavailable = status === 'sold'
  return <button className={`seat seat-${status} ${selected ? 'seat-selected' : ''}`} disabled={unavailable} onClick={() => onClick(id)} aria-label={`${id} ${unavailable ? 'unavailable' : selected ? 'selected' : 'available'}`}>{selected && <Check size={13} />}{!selected && id.replace(/[A-Z]/, '')}</button>
}
