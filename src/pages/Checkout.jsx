import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ordersAPI } from '../services/api'
import { validateEmail, validatePhone, validatePinCode, sanitizeInput } from '../utils/validation'
import { FiLock, FiLoader } from 'react-icons/fi'
import axios from 'axios'

// Ensure API_URL always ends with /api
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
if (!API_URL.endsWith('/api')) {
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`
}

// Checkout Form Component
const CheckoutForm = ({ cartItems, getCartTotal, clearCart, formData, setFormData, user }) => {
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Sanitize inputs
    const sanitizedValue = name === 'email' 
      ? sanitizeInput(value).toLowerCase()
      : sanitizeInput(value)
    
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    })
  }

  const validateForm = () => {
    if (!formData.firstName || formData.firstName.length < 2) {
      return { isValid: false, error: 'First name must be at least 2 characters' }
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      return { isValid: false, error: 'Last name must be at least 2 characters' }
    }
    if (!validateEmail(formData.email)) {
      return { isValid: false, error: 'Please enter a valid email address' }
    }
    if (!validatePhone(formData.phone)) {
      return { isValid: false, error: 'Please enter a valid 10-digit phone number' }
    }
    if (!formData.address || formData.address.length < 10) {
      return { isValid: false, error: 'Please enter a complete address' }
    }
    if (!formData.city || formData.city.length < 2) {
      return { isValid: false, error: 'Please enter a valid city name' }
    }
    if (!validatePinCode(formData.zipCode)) {
      return { isValid: false, error: 'Please enter a valid 6-digit PIN code' }
    }
    return { isValid: true, error: null }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setProcessing(true)

    try {
      // Validate form
      const validation = validateForm()
      if (!validation.isValid) {
        setError(validation.error)
        setProcessing(false)
        return
      }

      const total = (getCartTotal() * 1.1).toFixed(2)
      const token = localStorage.getItem('token')

      // Check if user is authenticated
      if (!token || !user) {
        setError('Please login to proceed with payment')
        setProcessing(false)
        navigate('/login', { state: { from: '/checkout' } })
        return
      }

      // Create Razorpay order
      let orderResponse
      try {
        orderResponse = await axios.post(
          `${API_URL}/create-order`,
          { amount: total, currency: 'INR' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (apiError) {
        if (apiError.code === 'ERR_NETWORK' || apiError.message.includes('Failed to fetch')) {
          setError('Cannot connect to server. Please make sure the backend is running on port 5000.')
          setProcessing(false)
          return
        }
        throw apiError
      }

      const { orderId, amount, currency, keyId } = orderResponse.data

      // Razorpay options
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'ShopHub',
        description: `Order for ${cartItems.length} item(s)`,
        order_id: orderId,
        // Enable all payment methods
        method: {
          card: true,
          netbanking: true,
          wallet: true,
          upi: true,
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(
              `${API_URL}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )

            if (verifyResponse.data.success) {
              // Create order
              const orderData = {
                items: cartItems,
                total: total,
                shipping: formData,
                paymentIntentId: response.razorpay_payment_id,
              }

              await ordersAPI.create(orderData)
              clearCart()
              navigate(`/order-success/${response.razorpay_payment_id}`)
            } else {
              setError('Payment verification failed. Please contact support.')
              setProcessing(false)
            }
          } catch (orderError) {
            console.error('Order creation error:', orderError)
            setError(orderError.response?.data?.error || 'Order creation failed. Payment was successful, please contact support.')
            setProcessing(false)
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: function () {
            setProcessing(false)
            setError('Payment was cancelled. Please try again.')
          },
        },
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      
      let errorMessage = 'Payment failed. Please try again.'
      
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 5000.'
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Shipping Information */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="+91 9876543210"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code *
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="input-field"
              pattern="[0-9]{6}"
              placeholder="123456"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={processing || !window.Razorpay}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <FiLoader className="animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <FiLock />
            <span>Proceed to Payment</span>
          </>
        )}
      </button>
    </form>
  )
}

// Main Checkout Component
const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { error: showError } = useToast()
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  // Check authentication on mount and when user changes
  useEffect(() => {
    if (!user) {
      showError('Please login to proceed to checkout')
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
  }, [user, navigate, showError])

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Start Shopping
        </button>
      </div>
    )
  }

  // Show loading if user is not authenticated yet
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-xl text-gray-600">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm
            cartItems={cartItems}
            getCartTotal={getCartTotal}
            clearCart={clearCart}
            formData={formData}
            setFormData={setFormData}
            user={user}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>₹{(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(getCartTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
