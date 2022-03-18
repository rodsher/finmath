import { InvalidBigIntMultiplierError } from './exceptions'
import { SCIENTIFIC_NOTATION_REGEXP } from './constants'

export function numberToString(num: number | bigint | string) {
  const numberAsString = num.toString()

  if (SCIENTIFIC_NOTATION_REGEXP.test(numberAsString)) {
    return scientificFloatToString(numberAsString)
  }

  return numberAsString
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

// TODO: Refactor
export function scientificFloatToString(num: number | string) {
  const nsign = Math.sign(num as number)
  //remove the sign
  num = Math.abs(num as number)

  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num.toString())) {
    var zero = '0',
      parts = String(num)
        .toLowerCase()
        .split('e'), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      //@ts-ignore
      l = Math.abs(e), //get the number of zeros
      //@ts-ignore
      sign = e / l,
      coeff_array = parts[0].split('.')
    if (sign === -1) {
      l = l - coeff_array[0].length
      if (l < 0) {
        //@ts-ignore
        num =
          coeff_array[0].slice(0, l) +
          '.' +
          coeff_array[0].slice(l) +
          (coeff_array.length === 2 ? coeff_array[1] : '')
      } else {
        //@ts-ignore
        num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('')
      }
    } else {
      var dec = coeff_array[1]
      if (dec) l = l - dec.length
      if (l < 0) {
        //@ts-ignore
        num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l)
      } else {
        //@ts-ignore
        num = coeff_array.join('') + new Array(l + 1).join(zero)
      }
    }
  }

  return nsign < 0 ? '-' + num : num.toString()
}
