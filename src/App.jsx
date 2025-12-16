import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { startKeepAlive } from './services/keepAlive'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const NotFound = lazy(() => import('./pages/NotFound'))

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  useEffect(() => {
    startKeepAlive()
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <RecentlyViewedProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow" role="main">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/order-success/:paymentIntentId" element={<OrderSuccess />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </div>
              </RecentlyViewedProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App

