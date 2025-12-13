/**
 * Unit Tests for Helper Functions
 * @module __tests__/helpers.test
 */

import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateTime,
  truncateText,
  getInitials,
  calculateDiscount,
  isEmpty,
  generateId,
} from '../utils/helpers'

describe('Helper Utilities', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('January')
    })

    it('should return empty string for null/undefined', () => {
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'a'.repeat(150)
      const truncated = truncateText(longText, 100)
      expect(truncated.length).toBe(103) // 100 + '...'
      expect(truncated).toContain('...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 100)).toBe(shortText)
    })
  })

  describe('getInitials', () => {
    it('should generate initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD')
      expect(getInitials('John')).toBe('J')
    })

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('')
    })
  })

  describe('calculateDiscount', () => {
    it('should calculate discount percentage', () => {
      expect(calculateDiscount(100, 80)).toBe(20)
      expect(calculateDiscount(200, 150)).toBe(25)
    })

    it('should return 0 for invalid inputs', () => {
      expect(calculateDiscount(0, 0)).toBe(0)
      expect(calculateDiscount(null, null)).toBe(0)
    })
  })

  describe('isEmpty', () => {
    it('should detect empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })

    it('should detect non-empty values', () => {
      expect(isEmpty('text')).toBe(false)
      expect(isEmpty([1, 2])).toBe(false)
      expect(isEmpty({ key: 'value' })).toBe(false)
      expect(isEmpty(0)).toBe(false)
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })
  })
})

