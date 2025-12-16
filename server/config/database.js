import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    return conn
  } catch (error) {
    process.exit(1)
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

