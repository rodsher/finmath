import { diff } from './utilities'

export class NumberPrecision {
  private integerRegexp = /^(-|\+)?\d+$/

  // TODO: Add validation for int or decimal
  /**
   * Get precision of number using Regular Expression.
   * The method can work with numbers and string representation of numbers.
   *
   * @example
   * // Example with number.
   * const precision = new NumberPrecision().getPrecision(1.875) // 3
   *
   * // Example with string representation of number.
   * const precision = new NumberPrecision().getPrecision('425.7525') // 4
   *
   * @param num Number or string with a numeric value
   * @returns Precision of given number
   */
  public getPrecision(num: number | string): number {
    if (this.integerRegexp.test(num.toString())) {
      return 0
    }

    return num.toString().split(`.`)[1].length
  }

  // TODO: Refactor naming and add JSDoc
  public setSamePrecision(x: number, y: number): [string, string, number] {
    const precisionX = this.getPrecision(x)
    const precisionY = this.getPrecision(y)
    const precisionDiff = diff(precisionX, precisionY)

    if (precisionX == precisionY) {
      return [x.toString(), y.toString(), precisionX]
    }

    if (precisionX > precisionY) {
      return [x.toString(), this.padWithZeros(y, precisionDiff), precisionX]
    }

    return [this.padWithZeros(x, precisionDiff), y.toString(), precisionY]
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
