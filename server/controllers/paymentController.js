import razorpay, { razorpayKeyId } from '../config/razorpay.js'
import crypto from 'crypto'

export async function createRazorpayOrder(req, res) {
  try {
    if (!razorpay) {
      return res.status(503).json({
        error: 'Payment processing is not configured. Please add Razorpay keys to .env file',
      })
    }

    const { amount, currency = 'INR' } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' })
    }

    const amountInPaise = Math.round(amount * 100)

    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId,
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create payment order' })
  }
}

export async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification data is required' })
    }

    if (!razorpay) {
      return res.status(503).json({
        error: 'Payment processing is not configured',
      })
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const secret = process.env.RAZORPAY_KEY_SECRET
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed: Invalid signature' })
    }

    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id)
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
        },
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment details' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Payment verification failed' })
  }
}

