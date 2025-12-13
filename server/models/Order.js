/**
 * Order Model
 * @module models/Order
 */

import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
  },
})

const shippingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
})

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    shipping: shippingSchema,
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
    statusHistory: [statusHistorySchema],
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
orderSchema.index({ userId: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ paymentStatus: 1 })

const Order = mongoose.model('Order', orderSchema)

export default Order

