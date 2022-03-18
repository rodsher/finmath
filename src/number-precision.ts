import { ZERO_PRECISION } from './constants'
import { numberToString } from './convert'
import { InvalidNumberError } from './exceptions'

export class NumberPrecision {
  private integerRegexp = /^(-|\+)?\d+$/
  private decimalRegexp = /^(-|\+)?(\d+)\.(\d+)$/
  private scientificNotationRegexp = /\d+\.?\d*e[\+\-]*\d+/i

  /**
   * Compute a precision of a given number.
   * The method can work with numbers and string representation of numbers.
   *
   * @example
   * // Examples with number and string
   * const precision = new NumberPrecision().compute(1.87) // 2
   * const precision = new NumberPrecision().compute(500) // 0
   * const precision = new NumberPrecision().compute('425.7125') // 4
   *
   * @throws {InvalidNumberError} The argument must be a valid number or string that can be converted to number
   * @param num Number or string with a numeric value
   * @returns Precision of given number
   */
  public compute(num: number | string): number | never {
    const numAsString = numberToString(num)

    if (this.integerRegexp.test(numAsString)) {
      return ZERO_PRECISION
    }

    if (this.decimalRegexp.test(numAsString)) {
      const [_wholePart, fractionalPart] = numAsString.split(`.`)

      return fractionalPart.length
    }

    throw new InvalidNumberError(num)
  }

  /**
   * Select maximum precision of given arguments.
   *
   * @throws {InvalidNumberError} The argument must be a valid number or string that can be converted to number
   * @param firstOperand Number or string with a numeric value
   * @param secondOperand Number or string with a numeric value
   * @returns Max precision
   */
  public max(firstOperand: number, secondOperand: number): number {
    const firstOperandPrecision = this.compute(firstOperand)
    const secondOperandPrecision = this.compute(secondOperand)

    if (firstOperandPrecision === secondOperandPrecision) {
      return firstOperandPrecision
    }

    if (firstOperandPrecision > secondOperandPrecision) {
      return firstOperandPrecision
    }

    return secondOperandPrecision
  }
}
