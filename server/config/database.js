import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    console.log(`Database: ${conn.connection.name}`)
    
    return conn
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    console.error('Check your MONGODB_URI in environment variables')
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect()
    console.log('MongoDB Disconnected')
  } catch (error) {
    console.error('MongoDB disconnect error:', error.message)
  }
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

export default mongoose

