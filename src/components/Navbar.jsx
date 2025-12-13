import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiShoppingBag } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
  const { getCartItemsCount } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="ShopHub Home"
          >
            <div className="bg-gradient-to-br from-primary-600 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
              <FiShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-extrabold gradient-text">ShopHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
              aria-label="Navigate to home page"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200"
              aria-label="Navigate to products page"
            >
              Products
            </Link>
            {user && (
              <Link to="/orders" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200">
                Orders
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-200">
                Admin
              </Link>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-3 text-gray-700 hover:text-primary-600 transition-all duration-200 hover:bg-primary-50 rounded-lg"
            >
              <FiShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            {user && (
              <>
                <Link
                  to="/orders"
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

