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
import mongoose from 'mongoose'

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

let dbConnected = false
let dbConnecting = false

async function ensureDBConnection() {
  if (dbConnected || mongoose.connection.readyState === 1) {
    return true
  }
  
  if (dbConnecting) {
    // Wait for ongoing connection attempt
    while (dbConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return dbConnected
  }
  
  dbConnecting = true
  try {
    await connectDB()
    dbConnected = true
    return true
  } catch (error) {
    console.error('Database connection failed:', error.message)
    dbConnected = false
    return false
  } finally {
    dbConnecting = false
  }
}

// Middleware to ensure DB connection for routes that need it
const requireDB = async (req, res, next) => {
  const connected = await ensureDBConnection()
  if (!connected) {
    return res.status(500).json({ error: 'Database connection unavailable' })
  }
  next()
}

// Apply DB connection middleware BEFORE routes
app.use('/api/products', requireDB, productRoutes)
app.use('/api/orders', requireDB, orderRoutes)
app.use('/api/auth', requireDB, authRoutes)
app.use('/api/stats', requireDB, statsRoutes)
app.use('/api', paymentRoutes)
app.use('/api', seedRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Something went wrong' })
})

// For Vercel serverless functions, export the Express app directly
// Vercel's @vercel/node automatically handles Express apps
export default app

