import { InvalidBigIntMultiplierError } from './exceptions'

/**
 * diff computes a positive difference between two numbers.
 *
 * @param x First number
 * @param y Second number
 * @returns Difference
 */
export function diff(x: number, y: number): number {
  if (x < 0 && y > 0) {
    return y - x
  }

  if (x > 0 && y < 0) {
    return x - y
  }

  if (x < 0 && y < 0) {
    if (x > y) {
      return (y - x) * -1
    }

    return (x - y) * -1
  }

  if (x > y) {
    return x - y
  }

  return y - x
}

/**
 * floatToBigInt converts a float to BigInt using multiplication.
 *
 * @examples
 * // Examples:
 * floatToBigInt(0.3, 10) // 3n
 * floatToBigInt(0.25, 100) // 25n
 * floatToBigInt(0.00005, 10 ** 8) // 5000n
 *
 * @param num
 * @param multiplier
 * @returns BigInt
 */
export function floatToBigInt(num: number, multiplier: number): bigint {
  if (num === 0) {
    return BigInt(0)
  }

  if (multiplier < 1) {
    throw new InvalidBigIntMultiplierError(multiplier)
  }

  const value = num * multiplier

  // Why we using Math.round() here?
  //
  // For example, package user called function with arguments decimalToBigInt(0.00007, 7).
  // The multiplier will be 10^7 = 10000000.
  // Multiplication will return 0.00007 * 10000000 = 699.9999999999999.
  // We dont want to lose precision and using the Math.round() method to round a float to the nearest integer.
  const roundedToNearestInteger = Math.round(value)

  return BigInt(roundedToNearestInteger)
}
