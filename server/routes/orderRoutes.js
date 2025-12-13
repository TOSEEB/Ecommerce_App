/**
 * Order Routes
 * @module routes/orderRoutes
 */

import express from 'express'
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Protected routes
router.get('/', authenticate, getAllOrders)
router.get('/:id', authenticate, getOrderById)
router.post('/', authenticate, createOrder)

// Admin only routes
router.put('/:id/status', authenticate, requireAdmin, updateOrderStatus)

export default router

