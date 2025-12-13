import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
      sparse: true, // Allow null/undefined
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be positive'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
      default: 4.5,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

// Index for faster queries
productSchema.index({ category: 1 })
productSchema.index({ name: 'text', description: 'text' })

// Virtual to update inStock based on stock
productSchema.pre('save', function (next) {
  this.inStock = this.stock > 0
  next()
})

// Method to get formatted product for frontend
productSchema.methods.toFrontendFormat = function () {
  return {
    id: this.productId || this._id.toString().slice(-6),
    name: this.name,
    price: this.price,
    image: this.image,
    category: this.category,
    description: this.description,
    inStock: this.inStock,
    stock: this.stock,
    rating: this.rating,
  }
}

const Product = mongoose.model('Product', productSchema)

export default Product

