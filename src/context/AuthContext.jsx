import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cinepass_user')) }
    catch { return null }
  })
  function updateUser(nextUser, token) {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem('cinepass_user', JSON.stringify(nextUser))
      if (token) localStorage.setItem('cinepass_token', token)
    } else {
      localStorage.removeItem('cinepass_user')
      localStorage.removeItem('cinepass_token')
    }
  }
  return <AuthContext.Provider value={{ user, setUser: updateUser }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
