import Product from '../models/Product.js'

// Get all products
export async function getAllProducts(req, res) {
  try {
    const { category, search } = req.query
    let query = {}

    if (category && category !== 'All') {
      query.category = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const products = await Product.find(query).sort({ createdAt: -1 })
    
    // Format for frontend
    const formattedProducts = products.map((product) => product.toFrontendFormat())

    res.json(formattedProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Get product by ID
 */
export async function getProductById(req, res) {
  try {
    // Try to find by productId (numeric) first, then by MongoDB _id
    let product = await Product.findOne({ productId: parseInt(req.params.id) })
    
    if (!product) {
      try {
        product = await Product.findById(req.params.id)
      } catch (e) {
        // Not a valid MongoDB ObjectId, continue
      }
    }
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product.toFrontendFormat())
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(500).json({ error: error.message })
  }
}

// Get similar products
export async function getSimilarProducts(req, res) {
  try {
    // Try to find by productId first, then by MongoDB _id
    let currentProduct = await Product.findOne({ productId: parseInt(req.params.id) })
    
    if (!currentProduct) {
      try {
        currentProduct = await Product.findById(req.params.id)
      } catch (e) {
        // Not a valid MongoDB ObjectId
      }
    }

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const similarProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: currentProduct._id },
    })
      .limit(4)
      .sort({ createdAt: -1 })

    const formattedProducts = similarProducts.map((product) => product.toFrontendFormat())

    res.json(formattedProducts)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(500).json({ error: error.message })
  }
}

// Create product (admin only)
export async function createProduct(req, res) {
  try {
    // Generate productId if missing
    if (!req.body.productId) {
      const count = await Product.countDocuments()
      req.body.productId = count + 1
    }

    const product = new Product({
      ...req.body,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock) || 0,
      rating: parseFloat(req.body.rating) || 4.5,
    })

    await product.save()

    res.status(201).json(product.toFrontendFormat())
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ error: errors.join(', ') })
    }
    res.status(500).json({ error: error.message })
  }
}

// Update product
export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key]
      }
    })

    // Ensure numeric fields are properly converted
    if (req.body.price !== undefined) {
      product.price = parseFloat(req.body.price)
    }
    if (req.body.stock !== undefined) {
      product.stock = parseInt(req.body.stock)
    }
    if (req.body.rating !== undefined) {
      product.rating = parseFloat(req.body.rating)
    }

    await product.save()

    res.json(product.toFrontendFormat())
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Product not found' })
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ error: errors.join(', ') })
    }
    res.status(500).json({ error: error.message })
  }
}

// Delete product
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(500).json({ error: error.message })
  }
}
