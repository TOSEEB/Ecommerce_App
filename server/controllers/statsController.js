import Order from '../models/Order.js'
import Product from '../models/Product.js'

export async function getStats(req, res) {
  try {
    const paidOrders = await Order.find({ paymentStatus: 'paid' })
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = await Order.countDocuments()
    const totalProducts = await Product.countDocuments()
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
