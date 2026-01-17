import axios from 'axios'
import { formatError } from '../utils/errorHandler'
import { retryRequest } from '../utils/retry'

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

if (!API_URL || API_URL.trim() === '' || API_URL.startsWith(':')) {
  API_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://ecommerce-app-3b6r.onrender.com/api'
}

if (!API_URL.endsWith('/api')) {
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`
}

const isProduction = !import.meta.env.DEV
const TIMEOUT = isProduction ? 60000 : 10000

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      ...error,
      userMessage: formatError(error)
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isAdmin')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(formattedError)
  }
)

export const productsAPI = {
  getAll: (params = {}) => retryRequest(() => api.get('/products', { params }), 2, 2000),
  getById: (id) => retryRequest(() => api.get(`/products/${id}`), 2, 2000),
  getSimilar: (id) => retryRequest(() => api.get(`/products/${id}/similar`), 2, 2000),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
}

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
}

export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  updateStatus: (id, status, trackingNumber, note) => 
    api.put(`/orders/${id}/status`, { status, trackingNumber, note }),
}

export const statsAPI = {
  getStats: () => api.get('/stats'),
}

export const paymentAPI = {
  createOrder: (amount, currency = 'INR') => 
    api.post('/create-order', { amount, currency }),
  verifyPayment: (paymentData) => 
    api.post('/verify-payment', paymentData),
}

export default api

