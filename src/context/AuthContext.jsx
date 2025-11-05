import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'pt_auth_v1'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage (and optionally validate)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.user) setUser(parsed.user)
      }
    } catch (e) {
      // ignore parse errors
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    // credentials: { email, password }
    const res = await axios.post('http://localhost:3000/login', credentials, { withCredentials: true })
    // For now we only persist a minimal user object; adjust to your backend response
    const nextUser = res.data?.user || { email: credentials.email }
    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: nextUser }))
    return res
  }

  const signup = async (payload) => {
    // payload: { first_name, last_name, email, password }
    const res = await axios.post('http://localhost:3000/register', payload, { withCredentials: true })
    return res
  }

  const logout = async () => {
    try {
      // Optional: hit backend logout endpoint if available
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true }).catch(() => {})
    } finally {
      setUser(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
