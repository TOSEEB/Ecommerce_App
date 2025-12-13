/**
 * Products Page Component
 * Displays product catalog with search, filter, and sort functionality
 * @module pages/Products
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { productsAPI } from '../services/api'
import Breadcrumbs from '../components/Breadcrumbs'
import { debounce } from '../utils/performance'
import { FiSearch, FiStar, FiFilter, FiChevronDown } from 'react-icons/fi'

const categories = ['All', 'Electronics', 'Accessories', 'Furniture']

/**
 * Products Page Component
 * Features: Search, Category Filter, Price Range Filter, Sorting
 * @returns {JSX.Element} Products page with filtering and sorting
 */
const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  // Debounced search to avoid too many API calls
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      setSearchTerm(value)
    }, 500),
    []
  )

  // Handle search input with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    debouncedSearch(value)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  /**
   * Fetches products from the API
   * Handles errors and loading states
   */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = {}
      if (selectedCategory !== 'All') params.category = selectedCategory
      if (searchTerm) params.search = searchTerm
      const response = await productsAPI.getAll(params)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchTerm])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  /**
   * Memoized filtered and sorted products
   * Optimizes performance by only recalculating when dependencies change
   */
  const filteredProducts = useMemo(() => {
    if (loading) return []

    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      return matchesCategory && matchesSearch && matchesPrice
    })

    // Sort products based on selected option
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating)
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [products, selectedCategory, searchTerm, priceRange, sortBy, loading])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Products', path: '/products' }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="input-field pl-10"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort and Price Filter */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Price Range */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-gray-200">
              <FiFilter className="text-gray-600" />
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min || ''}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max || ''}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 10000 })}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-10 font-semibold text-gray-700 hover:border-primary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-pointer transition-all duration-300"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-gray-600">
            Showing <span className="font-bold text-primary-600">{filteredProducts.length}</span> products
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
            <p className="font-semibold mb-2">Error Loading Products</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 btn-primary"
              aria-label="Retry loading products"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="card group"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available'
                  }}
                  aria-label={`${product.name} product image`}
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-current w-4 h-4" />
                    <span className="text-gray-800 font-bold text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-primary-600 font-extrabold text-2xl">₹{product.price}</p>
                  {product.inStock && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">In Stock</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Products

