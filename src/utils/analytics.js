/**
 * Analytics Utilities
 * Provides functions for tracking user interactions and page views
 * @module utils/analytics
 */

/**
 * Track page view
 * @param {string} pageName - Name of the page
 * @param {string} path - URL path
 */
export const trackPageView = (pageName, path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: pageName,
    })
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', pageName, path)
  }
}

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', eventName, eventParams)
  }
}

/**
 * Track product view
 * @param {Object} product - Product object
 */
export const trackProductView = (product) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      category: product.category,
      price: product.price,
    }],
  })
}

/**
 * Track add to cart
 * @param {Object} product - Product object
 * @param {number} quantity - Quantity added
 */
export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      category: product.category,
      price: product.price,
      quantity: quantity,
    }],
  })
}

/**
 * Track purchase
 * @param {Object} order - Order object
 */
export const trackPurchase = (order) => {
  trackEvent('purchase', {
    transaction_id: order.id,
    value: order.total,
    currency: 'INR',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

