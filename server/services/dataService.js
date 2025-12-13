/**
 * Data Service Layer
 * Handles all data operations (read/write to JSON file)
 * @module services/dataService
 */

import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_FILE = join(__dirname, '..', 'data.json')

/**
 * Get initial products data
 * @returns {Array} Array of initial products
 */
function getInitialProducts() {
  // Return empty array - products will be loaded from existing data.json if it exists
  // This prevents overwriting existing products
  return []
}

/**
 * Initialize data file with default structure
 */
export async function initializeData() {
  try {
    await fs.access(DATA_FILE)
    // File exists, no need to initialize
  } catch {
    // File doesn't exist, create with initial data
    const initialData = {
      products: getInitialProducts(),
      users: [
        {
          id: 1,
          email: 'admin@example.com',
          password: '$2a$10$rOzJqJqJqJqJqJqJqJqJqO', // admin123 (hashed)
          name: 'Admin User',
          role: 'admin',
        },
      ],
      orders: [],
    }
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2))
  }
}

/**
 * Read data from file
 * @returns {Promise<Object>} Data object with products, users, orders
 */
export async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    // Ensure all required arrays exist
    if (!parsed.products) parsed.products = []
    if (!parsed.users) parsed.users = []
    if (!parsed.orders) parsed.orders = []
    return parsed
  } catch (error) {
    console.error('Error reading data file:', error)
    return { products: [], users: [], orders: [] }
  }
}

/**
 * Write data to file
 * @param {Object} data - Data object to write
 */
export async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing data file:', error)
    throw new Error('Failed to save data: ' + error.message)
  }
}
