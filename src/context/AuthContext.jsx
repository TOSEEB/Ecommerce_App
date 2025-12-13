import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem('isAdmin')
    return saved === 'true'
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAdmin', user.role === 'admin' ? 'true' : 'false')
      setIsAdmin(user.role === 'admin')
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('token')
      setIsAdmin(false)
    }
  }, [user])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password })
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
        return { success: true, user: response.data.user }
      }
      return { success: false, error: 'Login failed' }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password })
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user)
        return { success: true, user: response.data.user }
      }
      return { success: false, error: 'Registration failed' }
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Registration failed' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    isAdmin,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

