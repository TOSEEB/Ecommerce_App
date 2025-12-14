import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import { formatError } from '../utils/errorHandler'

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
      return { success: false, error: response.data.error || 'Login failed. Please check your credentials.' }
    } catch (error) {
      // Use formatted error message
      const errorMessage = error.userMessage || formatError(error)
      return { success: false, error: errorMessage }
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
      return { success: false, error: response.data.error || 'Registration failed. Please try again.' }
    } catch (error) {
      // Use formatted error message
      const errorMessage = error.userMessage || formatError(error)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    // Clear user-specific data for fresh start
    localStorage.removeItem('recentlyViewed')
    localStorage.removeItem('cartItems')
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

