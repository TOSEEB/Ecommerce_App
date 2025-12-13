import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ordersAPI } from '../services/api'
import { FiUser, FiMail, FiShoppingBag, FiPackage, FiSettings } from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
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
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  const userOrders = orders

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{userOrders.length}</p>
            </div>
            <div className="bg-primary-100 p-4 rounded-full">
              <FiShoppingBag className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Spent</p>
              <p className="text-3xl font-bold mt-2">
                ₹{loading ? '0.00' : userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FiPackage className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Account Status</p>
              <p className="text-lg font-semibold mt-2 text-green-600">Active</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FiUser className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Account Information</h2>
          <Link
            to="/profile"
            className="btn-secondary flex items-center space-x-2"
          >
            <FiSettings />
            <span>Edit Profile</span>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FiUser className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FiMail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <button
            onClick={() => navigate('/orders')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </button>
        </div>
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.slice(0, 5).map(order => (
              <div key={order.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item(s)
                    </p>
                  </div>
                  <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders yet. Start shopping!</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

