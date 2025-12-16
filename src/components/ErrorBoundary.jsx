import React from 'react'
import { Link } from 'react-router-dom'
import { FiAlertCircle, FiHome, FiRefreshCw } from 'react-icons/fi'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're sorry, but something unexpected happened. Please try again.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-left">
              <h2 className="font-bold text-lg mb-4 text-gray-900">Error Details:</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm text-gray-800">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="btn-primary flex items-center justify-center space-x-2 px-8 py-4"
              >
                <FiRefreshCw />
                <span>Reload Page</span>
              </button>
              <Link
                to="/"
                className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4"
              >
                <FiHome />
                <span>Go Home</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-sm text-gray-500">
                <p>This error is only visible in development mode.</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

