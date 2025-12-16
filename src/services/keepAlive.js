let keepAliveInterval = null
let isActive = false

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BASE_URL = API_URL.replace('/api', '')

const pingBackend = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(`${BASE_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

export const startKeepAlive = () => {
  if (isActive || import.meta.env.DEV) {
    return
  }

  setTimeout(() => {
    pingBackend()
  }, 60000)

  keepAliveInterval = setInterval(() => {
    pingBackend()
  }, 10 * 60 * 1000)

  isActive = true
}

export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval)
    keepAliveInterval = null
    isActive = false
  }
}

export const isKeepAliveActive = () => isActive
