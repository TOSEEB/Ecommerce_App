import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">ShopHub</h3>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop shop for all your needs. Quality products, great prices, fast delivery.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 ShopHub. All rights reserved. Built with ❤️ for recruiters.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

