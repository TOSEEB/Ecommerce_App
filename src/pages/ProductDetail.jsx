import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import Breadcrumbs from '../components/Breadcrumbs'
import { FiStar, FiShoppingCart, FiArrowLeft, FiZoomIn } from 'react-icons/fi'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { success } = useToast()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageZoom, setImageZoom] = useState(false)

  useEffect(() => {
    fetchProduct()
    fetchSimilarProducts()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getById(id)
      setProduct(response.data)
      // Add to recently viewed
      if (response.data) {
        addToRecentlyViewed(response.data)
      }
    } catch (error) {
      // Product will remain null, which will show "Product not found" message
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarProducts = async () => {
    try {
      const response = await productsAPI.getSimilar(id)
      setSimilarProducts(response.data)
    } catch (error) {
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
        <button onClick={() => navigate('/products')} className="btn-primary mt-4">
          Back to Products
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    success(`${product.name} added to cart!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          { label: product.name, path: `/products/${product.id}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover cursor-zoom-in"
            onClick={() => setImageZoom(true)}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available'
            }}
            aria-label={`${product.name} product image`}
          />
          <button
            onClick={() => setImageZoom(true)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Zoom product image"
          >
            <FiZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Image Zoom Modal */}
          {imageZoom && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setImageZoom(false)}
            >
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => setImageZoom(false)}
                  className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-current" />
              <span className="ml-2 text-gray-600">{product.rating} Rating</span>
            </div>
            <span className="mx-4 text-gray-300">|</span>
            <span className="text-gray-600">{product.category}</span>
          </div>
          <p className="text-3xl font-bold text-primary-600 mb-4">₹{product.price}</p>
          
          {product.stock !== undefined && (
            <div className="mb-4">
              {product.inStock ? (
                <p className="text-green-600 font-semibold">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-500 font-semibold">✗ Out of Stock</p>
              )}
            </div>
          )}
          
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {product.inStock ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <p className="text-red-500 font-semibold mb-6">Out of Stock</p>
          )}

          <div className="flex space-x-4">
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center space-x-2 flex-1 justify-center"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ High quality materials</li>
              <li>✓ Fast and secure shipping</li>
              <li>✓ 30-day return policy</li>
              <li>✓ 1-year warranty included</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(similarProduct => (
              <Link
                key={similarProduct.id}
                to={`/products/${similarProduct.id}`}
                className="card group"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{similarProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{similarProduct.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-primary-600 font-bold text-xl">₹{similarProduct.price}</p>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current" />
                      <span className="text-gray-600 ml-1">{similarProduct.rating}</span>
                    </div>
                  </div>
                  {!similarProduct.inStock && (
                    <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

