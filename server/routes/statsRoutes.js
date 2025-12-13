/**
 * Statistics Routes
 * @module routes/statsRoutes
 */

import express from 'express'
import { getStats } from '../controllers/statsController.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Admin only route
router.get('/', authenticate, requireAdmin, getStats)

export default router

