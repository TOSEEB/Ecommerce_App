/**
 * Seed Routes
 * @module routes/seedRoutes
 */

import express from 'express'
import Product from '../models/Product.js'
import User from '../models/User.js'

const router = express.Router()

const initialProducts = [
  {
    productId: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    inStock: true,
    stock: 50,
    rating: 4.5,
  },
  {
    productId: 2,
    name: 'Smart Watch Pro',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance.',
    inStock: true,
    stock: 30,
    rating: 4.8,
  },
  {
    productId: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    description: 'Durable laptop backpack with padded compartments and USB charging port.',
    inStock: true,
    stock: 75,
    rating: 4.6,
  },
  {
    productId: 4,
    name: 'Wireless Mouse',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Accessories',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    inStock: true,
    stock: 100,
    rating: 4.4,
  },
  {
    productId: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Accessories',
    description: 'RGB mechanical keyboard with Cherry MX switches and customizable keys.',
    inStock: true,
    stock: 40,
    rating: 4.7,
  },
  {
    productId: 6,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    category: 'Accessories',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    inStock: true,
    stock: 60,
    rating: 4.5,
  },
  {
    productId: 7,
    name: 'Monitor Stand',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'Furniture',
    description: 'Adjustable monitor stand with cable management and extra storage space.',
    inStock: true,
    stock: 45,
    rating: 4.6,
  },
  {
    productId: 8,
    name: 'Bluetooth Speaker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    description: 'Portable wireless Bluetooth speaker with 360° sound and 12-hour battery life.',
    inStock: true,
    stock: 75,
    rating: 4.6,
  },
  {
    productId: 9,
    name: 'Desk Organizer',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500',
    category: 'Accessories',
    description: 'Bamboo desk organizer with multiple compartments for office supplies.',
    inStock: true,
    stock: 90,
    rating: 4.3,
  },
  {
    productId: 10,
    name: 'Webcam HD',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
    category: 'Electronics',
    description: '1080p HD webcam with auto-focus and built-in microphone for video calls.',
    inStock: true,
    stock: 55,
    rating: 4.5,
  },
  {
    productId: 11,
    name: 'Laptop Stand',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Accessories',
    description: 'Aluminum laptop stand with adjustable height and ventilation design.',
    inStock: true,
    stock: 80,
    rating: 4.4,
  },
  {
    productId: 12,
    name: 'Office Chair',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
    category: 'Furniture',
    description: 'Ergonomic office chair with mesh back, adjustable arms, and lumbar support.',
    inStock: true,
    stock: 30,
    rating: 4.8,
  },
  {
    productId: 13,
    name: 'Wireless Earbuds Pro',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    category: 'Electronics',
    description: 'Premium true wireless earbuds with active noise cancellation and 24-hour battery.',
    inStock: true,
    stock: 65,
    rating: 4.6,
  },
  {
    productId: 14,
    name: 'Tablet Stand',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'Accessories',
    description: 'Adjustable tablet stand with multiple viewing angles and sturdy base.',
    inStock: true,
    stock: 85,
    rating: 4.3,
  },
  {
    productId: 15,
    name: 'External SSD 1TB',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
    category: 'Electronics',
    description: 'Fast external SSD with USB-C connectivity and 1000MB/s read speeds.',
    inStock: true,
    stock: 40,
    rating: 4.8,
  },
  {
    productId: 16,
    name: 'Cable Management Kit',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    category: 'Accessories',
    description: 'Complete cable management solution with clips, ties, and sleeves.',
    inStock: true,
    stock: 120,
    rating: 4.4,
  },
  {
    productId: 17,
    name: 'Standing Desk Converter',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Furniture',
    description: 'Ergonomic standing desk converter with smooth height adjustment.',
    inStock: true,
    stock: 25,
    rating: 4.7,
  },
  {
    productId: 18,
    name: 'USB-C Cable Pack',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    category: 'Accessories',
    description: 'Set of 3 high-speed USB-C cables in different lengths (1m, 2m, 3m).',
    inStock: true,
    stock: 150,
    rating: 4.5,
  },
  {
    productId: 19,
    name: 'Smart Ring Light',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Accessories',
    description: 'LED ring light with adjustable brightness and color temperature for video calls.',
    inStock: true,
    stock: 70,
    rating: 4.6,
  },
  {
    productId: 20,
    name: 'Wireless Charging Pad',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    inStock: true,
    stock: 95,
    rating: 4.5,
  },
  {
    productId: 21,
    name: 'Laptop Cooling Pad',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
    category: 'Accessories',
    description: 'USB-powered laptop cooling pad with 5 quiet fans and adjustable height.',
    inStock: true,
    stock: 60,
    rating: 4.4,
  },
  {
    productId: 22,
    name: 'Gaming Mouse Pad',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Accessories',
    description: 'Large RGB gaming mouse pad with smooth surface and stitched edges.',
    inStock: true,
    stock: 110,
    rating: 4.5,
  },
]

// Seed database endpoint
router.post('/seed', async (req, res) => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments()
    if (existingProducts > 0) {
      return res.json({
        success: false,
        message: `Database already has ${existingProducts} products. To reseed, delete products first.`,
        existingCount: existingProducts
      })
    }

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@example.com' })
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // Will be hashed by pre-save hook
        role: 'admin',
      })
      await adminUser.save()
    }

    // Insert products
    const products = await Product.insertMany(initialProducts)

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      productsAdded: products.length,
      adminUser: adminExists ? 'Already exists' : 'Created: admin@example.com / admin123'
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to seed database'
    })
  }
})

export default router

