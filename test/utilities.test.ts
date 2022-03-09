import * as assert from 'assert'
import { diff, floatToBigInt } from '../src/utilities'

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

  describe('floatToBigInt', () => {
    // In this describe section, we are using assert module because
    // Jest tries to stringify BigInt that failures test cases.
    // See error: "TypeError: Do not know how to serialize a BigInt"

    it('should return zero when input also equals zero', () => {
      assert.strictEqual(floatToBigInt(0, 1), BigInt(0))
    })

    it('should return a right bigint when inputs are positive numbers', () => {
      assert.strictEqual(floatToBigInt(1, 10), BigInt(10))
      assert.strictEqual(floatToBigInt(2.0, 10), BigInt(20))
      assert.strictEqual(floatToBigInt(3.25, 100), BigInt(325))
      assert.strictEqual(floatToBigInt(0.00007, 10 ** 7), BigInt(700))
    })

    it('should return a right bigint when inputs are negative numbers', () => {
      assert.strictEqual(floatToBigInt(-1, 10), BigInt(-10))
      assert.strictEqual(floatToBigInt(-2.0, 10), BigInt(-20))
      assert.strictEqual(floatToBigInt(-3.25, 100), BigInt(-325))
      assert.strictEqual(floatToBigInt(-0.00007, 10 ** 7), BigInt(-700))
    })

    it('should throw exception when precision is negative', () => {
      expect(() => floatToBigInt(0.1, -1)).toThrowError(
        'Multiplier must be > 0, given -1 is less or equal to zero'
      )
    })

    it('should throw exception when precision equals to zero', () => {
      expect(() => floatToBigInt(0.1, 0)).toThrowError(
        'Multiplier must be > 0, given 0 is less or equal to zero'
      )
    })
  })
})
