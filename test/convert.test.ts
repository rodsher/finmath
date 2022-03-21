import * as assert from 'assert'
import {
  floatToBigInt,
  numberToString,
  scientificFloatToString,
  splitCoeff,
  splitCoeffAndExp
} from '../src/convert'

describe('convert', () => {
  describe('numberToString', () => {
    it.each([
      [100, '100'],
      [100.5, '100.5'],
      [100.5_0, '100.5'],
      [2.5e25, '25000000000000000000000000'],
      [-1.123e-10, '-0.0000000001123'],
      [-1e-3, '-0.001'],
      [-1.2e-2, '-0.012'],
      [12.12, '12.12'],
      [1411200000000000, '1411200000000000'],
      [0, '0'],
      [1.23423534e-12, '0.00000000000123423534']
    ])('numberToString(%f) === %s', (input, expected) => {
      expect(numberToString(input)).toBe(expected)
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

  describe('scientificFloatToString', () => {
    it.each([
      [2.5e25, '25000000000000000000000000'],
      [-1.123e-10, '-0.0000000001123'],
      [-1e-3, '-0.001'],
      [-1.2e-2, '-0.012'],
      [12.12, '12.12'],
      [1411200000000000, '1411200000000000'],
      [0, '0'],
      [1.23423534e-12, '0.00000000000123423534']
    ])('scientificFloatToString(%f) === %s', (input, expected) => {
      expect(numberToString(input)).toBe(expected)
    })
  })

  describe('splitToParts', () => {
    it('should return parts of number in scientific notation', () => {
      expect(splitCoeffAndExp(-1.123e-10)).toEqual(['-1.123', '-10'])
    })
  })

  describe('splitCoefficients', () => {
    it('should return splitted coefficients', () => {
      expect(splitCoeff('-1.123')).toEqual(['-1', '123'])
    })
  })
})
