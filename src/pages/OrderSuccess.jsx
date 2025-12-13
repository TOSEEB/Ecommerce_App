import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiCheckCircle, FiPackage, FiMail } from 'react-icons/fi'
import { ordersAPI } from '../services/api'

const OrderSuccess = () => {
  const { paymentIntentId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getAll()
      const foundOrder = response.data.find(o => o.paymentIntentId === paymentIntentId)
      setOrder(foundOrder)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600 mb-4">Order not found</p>
        <Link to="/orders" className="btn-primary">
          View My Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <FiCheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Order Number</h3>
            <p className="text-2xl font-bold text-primary-600">#{order.id}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Order Date</h3>
            <p className="text-lg">{new Date(order.date).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Total Amount</h3>
            <p className="text-2xl font-bold">₹{order.total.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Payment Status</h3>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
              Paid
            </span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <FiPackage className="mr-2" />
          Shipping Information
        </h3>
        <div className="text-gray-700">
          <p className="font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
          <p>{order.shipping.address}</p>
          <p>{order.shipping.city}, {order.shipping.zipCode}</p>
          <p className="mt-2">{order.shipping.email}</p>
          <p>{order.shipping.phone}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <FiMail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Order Confirmation Email</h4>
            <p className="text-blue-700">
              We've sent a confirmation email to <strong>{order.shipping.email}</strong> with your order details and tracking information.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/orders" className="btn-primary text-center">
          View All Orders
        </Link>
        <Link to="/products" className="btn-secondary text-center">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess

