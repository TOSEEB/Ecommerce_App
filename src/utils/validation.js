/**
 * Input Validation Utilities
 * Provides functions for validating user inputs and preventing XSS attacks
 * @module utils/validation
 */

/**
 * Sanitizes string input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim() // Remove leading/trailing whitespace
    .substring(0, 1000) // Limit length
}

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' }
  }
  return { isValid: true, message: '' }
}

/**
 * Validates phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

/**
 * Validates price (must be positive number)
 * @param {number|string} price - Price to validate
 * @returns {boolean} True if valid price
 */
export const validatePrice = (price) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return !isNaN(numPrice) && numPrice > 0
}

/**
 * Validates PIN code (Indian format - 6 digits)
 * @param {string} pinCode - PIN code to validate
 * @returns {boolean} True if valid PIN format
 */
export const validatePinCode = (pinCode) => {
  const pinRegex = /^\d{6}$/
  return pinRegex.test(pinCode)
}

/**
 * Escapes HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

