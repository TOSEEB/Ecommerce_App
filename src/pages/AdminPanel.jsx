import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { productsAPI, statsAPI } from '../services/api'
import { useToast } from '../context/ToastContext'
import { FiPlus, FiEdit, FiTrash2, FiPackage, FiDollarSign, FiUsers } from 'react-icons/fi'

const AdminPanel = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { success, error, confirm } = useToast()
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0 })
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Electronics',
    description: '',
    inStock: true,
    stock: 0,
    rating: 4.5,
  })

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/')
      return
    }
    fetchProducts()
    fetchStats()
  }, [user, isAdmin, navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll()
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await statsAPI.getStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (!user || !isAdmin) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, formData)
        success('Product updated successfully!')
      } else {
        await productsAPI.create(formData)
        success('Product added successfully!')
      }
      await fetchProducts()
      await fetchStats()
      handleCloseModal()
    } catch (err) {
      console.error('Error saving product:', err)
      error('Failed to save product. Please try again.')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description,
      inStock: product.inStock,
      rating: product.rating.toString(),
    })
    setShowAddModal(true)
  }

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id)
    confirm(
      `Are you sure you want to delete "${product?.name || 'this product'}"? This action cannot be undone.`,
      async () => {
        try {
          await productsAPI.delete(id)
          await fetchProducts()
          await fetchStats()
          success('Product deleted successfully!')
        } catch (err) {
          console.error('Error deleting product:', err)
          error('Failed to delete product. Please try again.')
        }
      }
    )
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      image: '',
      category: 'Electronics',
      description: '',
      inStock: true,
      stock: 0,
      rating: 4.5,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
            </div>
            <div className="bg-primary-100 p-4 rounded-full">
              <FiPackage className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FiDollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FiUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full mb-1 ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <span className="text-xs text-gray-500">
                        Qty: {product.stock !== undefined ? product.stock : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      <FiEdit className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                    >
                      <option>Electronics</option>
                      <option>Accessories</option>
                      <option>Furniture</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => {
                        const stock = parseInt(e.target.value) || 0
                        setFormData({ ...formData, stock: stock, inStock: stock > 0 })
                      }}
                      className="input-field"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

