import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Need this for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load env vars first
dotenv.config({ path: join(__dirname, '.env') })

// Routes
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import statsRoutes from './routes/statsRoutes.js'

import { connectDB } from './config/database.js'

// These need env vars loaded first
import './config/razorpay.js'
import './config/email.js'

const app = express()
const PORT = process.env.PORT || 5000

// Trust proxy for Railway/Render
app.set('trust proxy', 1)

app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API Server',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      stats: '/api/stats',
      payment: '/api/create-order'
    }
  })
})

// API root route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'E-commerce API',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      stats: '/api/stats',
      payment: '/api/create-order'
    }
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Routes
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api', paymentRoutes)
app.use('/api/stats', statsRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: err.message || 'Something went wrong' })
})

async function startServer() {
  try {
    await connectDB()
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`API: http://localhost:${PORT}/api`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use!`)
        process.exit(1)
      } else {
        console.error('Error starting server:', error)
        process.exit(1)
      }
    })
  } catch (error) {
    console.error('Failed to start:', error)
    process.exit(1)
  }
}

startServer()
