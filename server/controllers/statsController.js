import Order from '../models/Order.js'
import Product from '../models/Product.js'

// Get stats
export async function getStats(req, res) {
  try {
    // Get paid orders
    const paidOrders = await Order.find({ paymentStatus: 'paid' })
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0)
    
    // Get total orders
    const totalOrders = await Order.countDocuments()
    
    // Get total products
    const totalProducts = await Product.countDocuments()
    
    // Get low stock products
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } })

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      paidOrders: paidOrders.length,
      lowStockProducts,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
