/**
 * Payment Routes
 * @module routes/paymentRoutes
 */

import express from 'express'
import { createRazorpayOrder, verifyPayment } from '../controllers/paymentController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Protected routes
router.post('/create-order', authenticate, createRazorpayOrder)
router.post('/verify-payment', authenticate, verifyPayment)

export default router

