import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ordersAPI } from '../services/api'
import { formatError } from '../utils/errorHandler'
import { useToast } from '../context/ToastContext'
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi'

const Orders = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { error: showError } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [user, navigate])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await ordersAPI.getAll()
      setOrders(response.data.reverse())
    } catch (error) {
      console.error('Error fetching orders:', error)
      const errorMessage = error.userMessage || formatError(error)
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Loading orders...</p>
      </div>
    )
  }

  const userOrders = orders

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FiCalendar className="mr-2" />
                    {new Date(order.date).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                  </span>
                  {order.trackingNumber && (
                    <p className="text-xs text-gray-500 mt-1">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {order.shipping && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Shipping Address:</h4>
                  <p className="text-gray-600">
                    {order.shipping.firstName} {order.shipping.lastName}
                  </p>
                  <p className="text-gray-600">{order.shipping.address}</p>
                  <p className="text-gray-600">
                    {order.shipping.city}, {order.shipping.zipCode}
                  </p>
                </div>
              )}
              
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Order Status History:</h4>
                  <div className="space-y-2">
                    {order.statusHistory.map((history, idx) => (
                      <div key={idx} className="text-sm text-gray-600">
                        <span className="font-medium">{history.status.charAt(0).toUpperCase() + history.status.slice(1)}</span>
                        {' - '}
                        <span>{new Date(history.date).toLocaleString()}</span>
                        {history.note && <span className="text-gray-500"> - {history.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiPackage className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Browse Products
          </button>
        </div>
      )}
    </div>
  )
}

export default Orders

