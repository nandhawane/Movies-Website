import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
  const [currentBooking, setCurrentBooking] = useState(null)
  const toggleSeat = (seat) => setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat])
  const clearSelection = () => { setSelectedSeats([]); setSelectedShow(null) }
  return <BookingContext.Provider value={{ selectedSeats, toggleSeat, selectedShow, setSelectedShow, currentBooking, setCurrentBooking, clearSelection }}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
