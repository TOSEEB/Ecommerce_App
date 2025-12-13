import { Link } from 'react-router-dom'
import { FiHome, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-9xl font-extrabold text-primary-600 mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto mb-6"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/"
            className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <FiHome />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/products"
            className="btn-secondary flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <FiShoppingBag />
            <span>Browse Products</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-8 py-4 text-lg text-gray-700 hover:text-primary-600 transition-colors"
          >
            <FiArrowLeft />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-600">Popular Pages</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
                <li><Link to="/products" className="hover:text-primary-600">Products</Link></li>
                <li><Link to="/cart" className="hover:text-primary-600">Cart</Link></li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-600">Account</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/login" className="hover:text-primary-600">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary-600">Sign Up</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary-600">Dashboard</Link></li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-primary-600">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                If you believe this is an error, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

