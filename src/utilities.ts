import { FLOAT_REGEXP, INTEGER_REGEXP, SCIENTIFIC_NOTATION_REGEXP } from './constants'

/**
 * diff computes a positive difference between two numbers.
 * Always return a positive value.
 *
 * @example
 * // Examples:
 * diff(5, 10) // 5
 * diff(10, 5) // 5
 * diff(-5, 10) // 15
 * diff(-10, 5) // 15
 * diff(-10, -20) // 10
 * diff(-20, -10) // 10
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
 * isInteger is a helper function to check integer numbers.
 *
 * @example
 * // Examples:
 * isInteger(100) // true
 * isInteger(+100) // true
 * isInteger(-100) // true
 * isInteger(100n) // true
 * isInteger('100') // true
 * isInteger('100.00') // false
 *
 * @param num Number or string with a numeric value
 * @returns Result
 */
export function isInteger(num: number | bigint | string): boolean {
  if (INTEGER_REGEXP.test(num.toString())) {
    return true
  }

  return false
}

/**
 * isFloat is a helper function to check float numbers.
 *
 * @example
 * // Examples:
 * isFloat(100.01) // true
 * isFloat('100.01') // true
 * isFloat('100.00000001') // true
 * isFloat('100.00000000000001') // true
 * isFloat(100) // false
 *
 * @param num Number or string with a numeric value
 * @returns Result
 */
export function isFloat(num: number | bigint | string): boolean {
  if (FLOAT_REGEXP.test(num.toString())) {
    return true
  }

  return false
}

/**
 * isScientificFloat is a helper function to check float numbers in scientific notation.
 *
 * @example
 * // Examples:
 * isScientificFloat('2.5e25') // true
 * isScientificFloat('-1.123e-10') // true
 * isScientificFloat('-1e-3') // true
 * isScientificFloat('-1.2e-2') // true
 *
 * @param num Number or string with a numeric value
 * @returns Result
 */
export function isScientificFloat(num: number | bigint | string): boolean {
  if (SCIENTIFIC_NOTATION_REGEXP.test(num.toString())) {
    return true
  }

  return false
}
