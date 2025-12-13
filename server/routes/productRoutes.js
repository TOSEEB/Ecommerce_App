/**
 * Product Routes
 * @module routes/productRoutes
 */

import express from 'express'
import {
  getAllProducts,
  getProductById,
  getSimilarProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/:id/similar', getSimilarProducts)

// Protected routes (Admin only)
router.post('/', authenticate, requireAdmin, createProduct)
router.put('/:id', authenticate, requireAdmin, updateProduct)
router.delete('/:id', authenticate, requireAdmin, deleteProduct)

export default router

