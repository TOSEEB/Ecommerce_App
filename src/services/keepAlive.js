/**
 * Keep-Alive Service
 * Prevents Render free tier from spinning down by pinging the backend every 10 minutes
 * Render free tier spins down after 15 minutes of inactivity
 */

let keepAliveInterval = null
let isActive = false

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BASE_URL = API_URL.replace('/api', '')

/**
 * Ping the backend health endpoint to keep it alive
 */
const pingBackend = async () => {
  try {
    // Use fetch directly to avoid axios interceptors and timeout issues
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout for ping
    
    const response = await fetch(`${BASE_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      console.log('[Keep-Alive] Backend ping successful')
      return true
    }
    return false
  } catch (error) {
    // Silently fail - this is just a keep-alive ping
    // Don't log errors to avoid cluttering console
    return false
  }
}

/**
 * Start the keep-alive service
 * Pings backend every 10 minutes (600,000ms)
 * Render spins down after 15 minutes, so 10 minutes is safe
 */
export const startKeepAlive = () => {
  // Don't start if already active or in development
  if (isActive || import.meta.env.DEV) {
    return
  }

  // Initial ping after 1 minute (give app time to load)
  setTimeout(() => {
    pingBackend()
  }, 60000)

  // Then ping every 10 minutes
  keepAliveInterval = setInterval(() => {
    pingBackend()
  }, 10 * 60 * 1000) // 10 minutes

  isActive = true
  console.log('[Keep-Alive] Service started - pinging backend every 10 minutes')
}

/**
 * Stop the keep-alive service
 */
export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval)
    keepAliveInterval = null
    isActive = false
    console.log('[Keep-Alive] Service stopped')
  }
}

/**
 * Check if keep-alive is active
 */
export const isKeepAliveActive = () => isActive
