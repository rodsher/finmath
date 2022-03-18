import * as assert from 'assert'
import { floatToBigInt, scientificFloatToString } from '../src/convert'

describe('convert', () => {
  describe('numberToString', () => {
    it('should return a correct string representation of number', () => {})
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
    expect(scientificFloatToString(2.5e25)).toEqual('25000000000000000000000000')
    expect(scientificFloatToString(-1.123e-10)).toEqual('-0.0000000001123')
    expect(scientificFloatToString(-1e-3)).toEqual('-0.001')
    expect(scientificFloatToString(-1.2e-2)).toEqual('-0.012')
    expect(scientificFloatToString(12.12)).toEqual('12.12')
    expect(scientificFloatToString(1411200000000000)).toEqual('1411200000000000')
    expect(scientificFloatToString(0)).toEqual('0')
    expect(scientificFloatToString(1.23423534e-12)).toEqual('0.00000000000123423534')
  })
})
