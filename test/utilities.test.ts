import { diff, isFloat, isInteger, isScientificFloat } from '../src/utilities'

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

  describe('isInteger', () => {
    it.each([
      [100, true],
      [-100, true],
      [+100, true],
      [BigInt(100), true],
      [1e7, true],
      [-100.5, false],
      [0.1e-7, false],
      ['100.00', false],
      ['100.00000001', false],
      ['100.00000000000001', false]
    ])('isInteger(%d) === %s', (input, expected) => {
      expect(isInteger(input)).toBe(expected)
    })
  })

  describe('isFloat', () => {
    it.each([
      [100, false],
      [-100, false],
      [+100, false],
      [BigInt(100), false],
      [1e7, false],
      [-100.5, true],
      ['100.00', true],
      ['100.00000001', true],
      ['100.00000000000001', true]
    ])('isFloat(%d) === %s', (input, expected) => {
      expect(isFloat(input)).toBe(expected)
    })
  })

  describe('isScientificFloat', () => {
    it.each([
      ['2.5e25', true],
      ['-1.123e-10', true],
      ['-1e-3', true],
      ['-1.2e-', true],
      ['100', false],
      ['100.5', false]
    ])('isScientificFloat(%d) === %s', (input, expected) => {
      expect(isScientificFloat(input)).toBe(expected)
    })
  })
})
