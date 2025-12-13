import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

let razorpay = null
const razorpayKeyId = process.env.RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

if (razorpayKeyId && razorpayKeySecret) {
  try {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
    console.log('Razorpay initialized')
  } catch (error) {
    console.error('Razorpay init failed:', error.message)
  }
} else {
  console.log('Razorpay keys not found in .env')
}

export default razorpay
export { razorpayKeyId }

