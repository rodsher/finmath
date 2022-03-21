import { InvalidBigIntMultiplierError } from './exceptions'
import { isScientificFloat } from './utilities'

/**
 * numberToString converts number or string representation of number in different format
 * to a unified string with a fractional part or an integer.
 *
 * @example
 * // Examples:
 * numberToString(100) // '100'
 * numberToString(100.00000001) // '100.00000001'
 * numberToString(1e-7) // '0.0000001'
 *
 * @private
 * @param num
 * @returns Result of convertation
 */
export function numberToString(num: number | bigint | string): string {
  const numAsString = num.toString()

  if (isScientificFloat(numAsString)) {
    return scientificFloatToString(numAsString)
  }

  return numAsString
}

/**
 * floatToBigInt converts a float to BigInt using multiplication.
 *
 * @example
 * // Examples:
 * floatToBigInt(0.3, 10) // 3n
 * floatToBigInt(0.25, 100) // 25n
 * floatToBigInt(0.00005, 10 ** 8) // 5000n
 *
 * @private
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

export function scientificFloatToString(num: number | string) {
  const nSign = Math.sign(Number(num))
  const n = Math.abs(Number(num))

  let numAsString: string = ''

  if (isScientificFloat(n.toString())) {
    const zeroChar = '0'
    const [coeff, exp] = splitCoeffAndExp(n)
    const coeffs = splitCoeff(coeff)
    const [whole, fractional] = coeffs
    const exponentialPart = Number(exp)

    let numberOfZeros = Math.abs(exponentialPart)
    let sign = exponentialPart / numberOfZeros

    if (isNegative(sign)) {
      numberOfZeros = numberOfZeros - whole.length

      if (numberOfZeros < 0) {
        numAsString = concatNumberWithoutZeros(whole, numberOfZeros, coeffs)
      } else {
        numAsString = concatNumberWithZeros(zeroChar, numberOfZeros, coeffs)
      }
    } else {
      if (fractional) {
        numberOfZeros = numberOfZeros - fractional.length
      }

      if (numberOfZeros < 0) {
        numAsString = concatWithoutZerosWhenPositive(coeffs, fractional, numberOfZeros)
      } else {
        numAsString = concatWithZerosWhenPositive(coeffs, numberOfZeros, zeroChar)
      }
    }
  }

  return nSign < 0 ? `-${numAsString}` : numAsString
}

/**
 * splitCoeffAndExp returns coefficient and exponential parts.
 *
 * @example
 * // Example:
 * splitToParts(-1.123e-10) // [ '-1.123', '-10' ]
 *
 * @private
 * @param num Number in a scientific notation
 * @returns The whole and the fractional part
 */
export const splitCoeffAndExp = (num: number): string[] =>
  num
    .toString()
    .toLowerCase()
    .split('e')

/**
 * splitCoeff returns whole and fractional parts.
 *
 * @private
 * @param num Float number
 * @returns The whole and the fractional part
 */
export const splitCoeff = (num: string) => num.split('.')

export const isNegative = (n: number) => n < 0

function concatWithoutZerosWhenPositive(
  coeffs: string[],
  fractional: string,
  numberOfZeros: number
): string {
  return coeffs[0] + fractional.slice(0, numberOfZeros) + '.' + fractional.slice(numberOfZeros)
}

function concatNumberWithZeros(
  zeroChar: string,
  numberOfZeros: number,
  floatCoefficients: string[]
): string {
  return zeroChar + '.' + new Array(numberOfZeros + 1).join(zeroChar) + floatCoefficients.join('')
}

function concatNumberWithoutZeros(
  whole: string,
  numberOfZeros: number,
  floatCoefficients: string[]
): string {
  return (
    whole.slice(0, numberOfZeros) +
    '.' +
    floatCoefficients[0].slice(numberOfZeros) +
    (floatCoefficients.length === 2 ? floatCoefficients[1] : '')
  )
}

function concatWithZerosWhenPositive(
  coeffs: string[],
  numberOfZeros: number,
  zeroChar: string
): string {
  return coeffs.join('') + new Array(numberOfZeros + 1).join(zeroChar)
}
