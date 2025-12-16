export const trackPageView = (pageName, path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: pageName,
    })
  }
}

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

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

