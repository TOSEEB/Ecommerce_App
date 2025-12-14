/**
 * Format error messages for user-friendly display
 */
export const formatError = (error) => {
  // If error is already a string, return it
  if (typeof error === 'string') {
    return error
  }

  // Handle Axios errors
  if (error.response) {
    const status = error.response.status
    const data = error.response.data

    // Handle specific status codes
    switch (status) {
      case 404:
        // Check if it's a user-related 404
        if (data?.error?.toLowerCase().includes('user') || 
            data?.message?.toLowerCase().includes('user') ||
            error.config?.url?.includes('/auth/')) {
          return 'User does not exist in the system. Please check your email or register a new account.'
        }
        // Check if it's a product-related 404
        if (error.config?.url?.includes('/products/')) {
          return 'Product not found. It may have been removed or does not exist.'
        }
        // Check if it's an order-related 404
        if (error.config?.url?.includes('/orders/')) {
          return 'Order not found. Please check your order ID.'
        }
        return 'The requested resource was not found.'
      
      case 401:
        // Check for specific auth errors
        if (data?.error?.toLowerCase().includes('invalid credentials') || 
            data?.error?.toLowerCase().includes('invalid') ||
            error.config?.url?.includes('/auth/login')) {
          return 'Invalid email or password. Please check your credentials or register a new account.'
        }
        return 'You are not authorized. Please login again.'
      
      case 403:
        return 'You do not have permission to perform this action.'
      
      case 400:
        return data?.error || data?.message || 'Invalid request. Please check your input.'
      
      case 500:
        return 'Server error. Please try again later.'
      
      default:
        return data?.error || data?.message || 'An error occurred. Please try again.'
    }
  }

  // Handle network errors
  if (error.code === 'ERR_NETWORK' || error.message?.includes('Failed to fetch')) {
    return 'Cannot connect to server. Please check your internet connection and try again.'
  }

  // Handle timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'Request timed out. Please try again.'
  }

  // Default error message
  return error.message || 'An unexpected error occurred. Please try again.'
}

/**
 * Check if error is a 404
 */
export const isNotFoundError = (error) => {
  return error.response?.status === 404
}

/**
 * Check if error is a network error
 */
export const isNetworkError = (error) => {
  return error.code === 'ERR_NETWORK' || error.message?.includes('Failed to fetch')
}

