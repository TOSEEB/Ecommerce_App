let keepAliveInterval = null
let isActive = false

let API_URL = import.meta.env.VITE_API_URL

if (!API_URL || API_URL.trim() === '' || API_URL.startsWith(':')) {
  if (import.meta.env.DEV) {
    API_URL = 'http://localhost:5000/api'
  } else {
    const currentOrigin = window.location.origin
    API_URL = `${currentOrigin}/api`
  }
}

const BASE_URL = API_URL.replace('/api', '')

const pingBackend = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(`${BASE_URL}/api/wake-up`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok || response.status === 404) {
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

  pingBackend()

  setTimeout(() => {
    pingBackend()
  }, 15000)

  setTimeout(() => {
    pingBackend()
  }, 30000)

  keepAliveInterval = setInterval(() => {
    pingBackend()
  }, 7 * 60 * 1000)

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
