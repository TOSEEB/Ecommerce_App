import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }
    const conn = await mongoose.connect(MONGODB_URI)
    return conn
  } catch (error) {
    console.error('Database connection error:', error.message)
    throw error
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect()
  } catch (error) {
  }
}

mongoose.connection.on('error', (err) => {
})

mongoose.connection.on('disconnected', () => {
})

export default mongoose

