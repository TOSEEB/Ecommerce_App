import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import productRoutes from '../server/routes/productRoutes.js'
import authRoutes from '../server/routes/authRoutes.js'
import orderRoutes from '../server/routes/orderRoutes.js'
import paymentRoutes from '../server/routes/paymentRoutes.js'
import statsRoutes from '../server/routes/statsRoutes.js'
import seedRoutes from '../server/routes/seedRoutes.js'

import { connectDB } from '../server/config/database.js'

// Import config files - they handle errors internally
import '../server/config/razorpay.js'
import '../server/config/email.js'

const app = express()

app.set('trust proxy', 1)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API Server',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      wakeUp: '/api/wake-up',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      stats: '/api/stats',
      payment: '/api/create-order',
      seed: '/api/seed (POST)'
    }
  })
})

app.get('/api', (req, res) => {
  res.json({ 
    message: 'E-commerce API',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      wakeUp: '/api/wake-up',
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      stats: '/api/stats',
      payment: '/api/create-order',
      seed: '/api/seed (POST)'
    }
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.get('/api/wake-up', async (req, res) => {
  try {
    await connectDB()
    const Product = (await import('../server/models/Product.js')).default
    const count = await Product.countDocuments()
    res.json({ status: 'OK', message: 'Backend is awake', productsCount: count })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api', paymentRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api', seedRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Something went wrong' })
})

let dbConnected = false

async function connectDatabase() {
  if (!dbConnected) {
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('Database connection failed:', error.message)
      // Don't throw - allow the app to continue without DB for some endpoints
    }
  }
}

export default async function handler(req, res) {
  try {
    // Connect to database (non-blocking, won't crash if it fails)
    await connectDatabase()
    
    // Return Express app handling the request
    return app(req, res)
  } catch (error) {
    console.error('Handler error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error', message: error.message })
    }
  }
}

