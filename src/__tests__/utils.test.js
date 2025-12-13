/**
 * Unit Tests for Utility Functions
 * Basic tests to demonstrate testing knowledge
 * @module __tests__/utils.test
 */

import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validatePhone, validatePinCode } from '../utils/validation'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.in')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate passwords with at least 6 characters', () => {
      const result = validatePassword('password123')
      expect(result.isValid).toBe(true)
    })

    it('should reject passwords shorter than 6 characters', () => {
      const result = validatePassword('12345')
      expect(result.isValid).toBe(false)
      expect(result.message).toContain('6 characters')
    })
  })

  describe('validatePhone', () => {
    it('should validate Indian phone numbers', () => {
      expect(validatePhone('9876543210')).toBe(true)
      expect(validatePhone('9123456789')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('1234567890')).toBe(false) // Doesn't start with 6-9
      expect(validatePhone('987654321')).toBe(false) // Less than 10 digits
    })
  })

  describe('validatePinCode', () => {
    it('should validate 6-digit PIN codes', () => {
      expect(validatePinCode('123456')).toBe(true)
      expect(validatePinCode('400001')).toBe(true)
    })

    it('should reject invalid PIN codes', () => {
      expect(validatePinCode('12345')).toBe(false) // Less than 6 digits
      expect(validatePinCode('1234567')).toBe(false) // More than 6 digits
      expect(validatePinCode('abc123')).toBe(false) // Contains letters
    })
  })
})

