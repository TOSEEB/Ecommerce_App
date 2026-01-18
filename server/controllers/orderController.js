import Order from '../models/Order.js'
import Product from '../models/Product.js'
import razorpay from '../config/razorpay.js'
import { sendOrderConfirmationEmail } from '../utils/emailService.js'
import mongoose from 'mongoose'

export async function getAllOrders(req, res) {
  try {
    let query = {}
    
    if (req.user.role !== 'admin') {
      query.userId = new mongoose.Types.ObjectId(req.user.id)
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })

    const formattedOrders = orders.map((order) => ({
      id: order._id.toString().slice(-6),
      userId: order.userId.toString(),
      userEmail: order.userEmail,
      items: order.items,
      shipping: order.shipping,
      total: order.total,
      date: order.createdAt.toISOString(),
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentIntentId: order.paymentIntentId,
      trackingNumber: order.trackingNumber,
      statusHistory: order.statusHistory,
    }))

    res.json(formattedOrders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' })
    }

    res.json({
      id: order._id.toString().slice(-6),
      userId: order.userId.toString(),
      userEmail: order.userEmail,
      items: order.items,
      shipping: order.shipping,
      total: order.total,
      date: order.createdAt.toISOString(),
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentIntentId: order.paymentIntentId,
      trackingNumber: order.trackingNumber,
      statusHistory: order.statusHistory,
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.status(500).json({ error: error.message })
  }
}

export async function createOrder(req, res) {
  try {
    const { items, total, shipping, paymentIntentId } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' })
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Valid total is required' })
    }

    if (!shipping) {
      return res.status(400).json({ error: 'Shipping information is required' })
    }

    for (const item of items) {
      let product = await Product.findOne({ productId: parseInt(item.id) })
      
      if (!product) {
        try {
          product = await Product.findById(item.id)
        } catch (e) {
        }
      }
      
      if (!product) {
        return res.status(404).json({ error: `Product "${item.name}" not found` })
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for "${item.name}". Available: ${product.stock}, Requested: ${item.quantity}`,
        })
      }

      product.stock -= item.quantity
      await product.save()
    }

    let paymentStatus = 'pending'
    if (paymentIntentId) {
      if (paymentIntentId.startsWith('pi_mock_') || paymentIntentId.startsWith('pay_mock_') || paymentIntentId.startsWith('pay_test_')) {
        paymentStatus = 'paid'
      } else if (!razorpay) {
        return res.status(503).json({
          error: 'Payment processing is not configured. Cannot verify payment.',
        })
      } else {
        if (paymentIntentId.startsWith('pay_')) {
          try {
            const payment = await razorpay.payments.fetch(paymentIntentId)
            if (payment.status === 'authorized' || payment.status === 'captured') {
              paymentStatus = 'paid'
            } else if (payment.status === 'failed') {
              return res.status(400).json({
                error: 'Payment failed. Please try again.',
                paymentStatus: payment.status,
              })
            } else {
              paymentStatus = 'pending'
            }
          } catch (error) {
            return res.status(400).json({
              error: 'Failed to verify payment. Please contact support if payment was charged.',
              details: error.message,
            })
          }
        } else {
          paymentStatus = 'paid'
        }
      }
    } else {
      return res.status(400).json({ error: 'Payment intent ID is required' })
    }

    const trackingNumber = 'TRK' + Date.now().toString().slice(-10) + Math.random().toString(36).substring(2, 7).toUpperCase()

    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(req.user.id),
      userEmail: req.user.email,
      items,
      shipping,
      total: parseFloat(total),
      status: 'pending',
      paymentStatus: paymentStatus,
      paymentIntentId: paymentIntentId || null,
      trackingNumber: trackingNumber,
      statusHistory: [
        {
          status: 'pending',
          date: new Date(),
          note: 'Order placed and payment confirmed',
        },
      ],
    })

    await newOrder.save()

    try {
      await sendOrderConfirmationEmail({
        ...newOrder.toObject(),
        id: newOrder._id.toString().slice(-6),
        date: newOrder.createdAt.toISOString(),
      })
      console.log(`Order confirmation email sent for order #${newOrder._id.toString().slice(-6)}`)
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError.message)
      // Don't fail the order creation if email fails
    }

    res.status(201).json({
      id: newOrder._id.toString().slice(-6),
      userId: newOrder.userId.toString(),
      userEmail: newOrder.userEmail,
      items: newOrder.items,
      shipping: newOrder.shipping,
      total: newOrder.total,
      date: newOrder.createdAt.toISOString(),
      status: newOrder.status,
      paymentStatus: newOrder.paymentStatus,
      paymentIntentId: newOrder.paymentIntentId,
      trackingNumber: newOrder.trackingNumber,
      statusHistory: newOrder.statusHistory,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { status, trackingNumber, note } = req.body
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    order.status = status
    if (trackingNumber) {
      order.trackingNumber = trackingNumber
    }

    order.statusHistory.push({
      status,
      date: new Date(),
      note: note || `Order status updated to ${status}`,
    })

    await order.save()

    res.json({
      id: order._id.toString().slice(-6),
      userId: order.userId.toString(),
      userEmail: order.userEmail,
      items: order.items,
      shipping: order.shipping,
      total: order.total,
      date: order.createdAt.toISOString(),
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentIntentId: order.paymentIntentId,
      trackingNumber: order.trackingNumber,
      statusHistory: order.statusHistory,
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.status(500).json({ error: error.message })
  }
}
