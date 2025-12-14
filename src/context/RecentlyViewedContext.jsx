import { createContext, useContext, useState, useEffect } from 'react'

const RecentlyViewedContext = createContext()

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  }
  return context
}

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (recentlyViewed.length === 0) {
      localStorage.removeItem('recentlyViewed')
    } else {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed])

  // Listen for storage changes (e.g., when cleared on logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('recentlyViewed')
      if (!saved) {
        setRecentlyViewed([])
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id)
      // Add to beginning and limit to 10
      return [product, ...filtered].slice(0, 10)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  }

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>
}

