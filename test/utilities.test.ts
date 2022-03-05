import { diff } from '../src/utilities'

describe('utilities', () => {
  describe('diff', () => {
    it('should return a right result when a first argument is greater than a second', () => {
      expect(diff(10, 5)).toBe(5)
    })

    it('should return a right result when a second argument is greater than a first', () => {
      expect(diff(5, 10)).toBe(5)
    })

    it('should return a right result when first and second argument are equals', () => {
      expect(diff(10, 10)).toBe(0)
    })

    it('should return a right result when first and second argument are zeros', () => {
      expect(diff(0, 0)).toBe(0)
    })

    it('should return a right result when first argument is a negative number', async () => {
      expect(diff(-5, 10)).toBe(15)
    })

    it('should return a right result when second argument is a negative number', async () => {
      expect(diff(5, -10)).toBe(15)
    })

    it('should return a right result when first and second arguments are negative numbers, first greater', async () => {
      expect(diff(-10, -20)).toBe(10)
    })

    it('should return a right result when first and second arguments are negative numbers, second greater', async () => {
      expect(diff(-20, -10)).toBe(10)
    })
  })
})
