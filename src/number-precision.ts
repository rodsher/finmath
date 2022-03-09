import { InvalidNumberError } from './exceptions'

export class NumberPrecision {
  private integerRegexp = /^(-|\+)?\d+$/
  private decimalRegexp = /^(-|\+)?(\d+)\.(\d+)$/

  /**
   * Get precision of number using Regular Expression.
   * The method can work with numbers and string representation of numbers.
   *
   * @example
   * // Examples with number and string
   * const precision = new NumberPrecision().getPrecision(1.87) // 2
   * const precision = new NumberPrecision().getPrecision('425.7125') // 4
   *
   * @throws {InvalidNumberError} The argument must be a valid number or string that can be converted to number.
   * @param num Number or string with a numeric value
   * @returns Precision of given number
   */
  public getPrecision(num: number | string): number | never {
    const numAsString = num.toString()

    if (this.integerRegexp.test(numAsString)) {
      return 0
    }

    if (this.decimalRegexp.test(numAsString)) {
      const [_wholePart, fractionalPart] = numAsString.split(`.`)

      return fractionalPart.length
    }

    throw new InvalidNumberError(num)
  }

  public max(firstOperand: number, secondOperand: number): number {
    const firstOperandPrecision = this.getPrecision(firstOperand)
    const secondOperandPrecision = this.getPrecision(secondOperand)

    if (firstOperandPrecision === secondOperandPrecision) {
      return firstOperandPrecision
    }

    if (firstOperandPrecision > secondOperandPrecision) {
      return firstOperandPrecision
    }

    return secondOperandPrecision
  }

  // TODO: Refactor to a separate class
  public padWithZeros(num: number, precision: number): string {
    let n: string = num.toString()

    if (this.integerRegexp.test(n) && precision > 0) {
      n += '.'
    }

    for (let index = 0; index < precision; index++) {
      n += '0'
    }

    return n
  }
}
