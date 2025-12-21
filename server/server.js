import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
import seedRoutes from './routes/seedRoutes.js'

import { connectDB } from './config/database.js'

import './config/razorpay.js'
import './config/email.js'

const app = express()
const PORT = process.env.PORT || 5000

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
    const Product = (await import('./models/Product.js')).default
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

async function startServer() {
  try {
    await connectDB()
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`API: http://localhost:${PORT}/api`)
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        process.exit(1)
      } else {
        process.exit(1)
      }
    })
  } catch (error) {
    process.exit(1)
  }
}

startServer()
