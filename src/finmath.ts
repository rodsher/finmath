/**
 * This is a main library file that containts a primary class Math.
 *
 * @fileoverview
 */

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

/* tslint:disable:unified-signatures */

import { ArgumentIsGreaterThanMaxError, ArgumentIsLessThanMinError } from './exceptions'
import { NumberPrecision } from './number-precision'

export class FinMath {
  private leftOperand: number
  private rightOperand!: number
  private precision!: NumberPrecision

  constructor()
  constructor(num: number)
  constructor(num?: number) {
    this.leftOperand = num ?? 0
    this.precision = new NumberPrecision()
  }

  static fromNumber(num: number): FinMath {
    if (num > Number.MAX_SAFE_INTEGER) {
      throw new ArgumentIsGreaterThanMaxError(num)
    }

    if (num < Number.MIN_SAFE_INTEGER) {
      throw new ArgumentIsLessThanMinError(num)
    }

    return new FinMath(num)
  }

  add(num: number): FinMath
  add(num: string): FinMath
  add(num: number | string): FinMath {
    this.rightOperand = Number(num)

    const [left, right, precision] = this.precision.setSamePrecision(
      this.leftOperand,
      this.rightOperand
    )
    const pow = 10 ** precision
    const leftOperand = Number(left) * pow
    const rightOperand = Number(right) * pow

    this.leftOperand = Number(BigInt(leftOperand) + BigInt(rightOperand)) / pow

    return this
  }

  result(): number {
    return this.leftOperand
  }
}
