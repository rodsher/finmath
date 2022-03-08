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

    const leftPrecision = this.precision.getPrecision(this.leftOperand)
    const rightPrecision = this.precision.getPrecision(this.rightOperand)
    const maxPrecision = Math.max(leftPrecision, rightPrecision)

    const multiplier = 10 ** maxPrecision

    // Describe a problem about 6.999999999999999 and ways how to avoid it
    const leftOperand = Math.round(this.leftOperand * multiplier)
    const rightOperand = Math.round(this.rightOperand * multiplier)

    this.leftOperand = Number(BigInt(leftOperand) + BigInt(rightOperand)) / multiplier

    return this
  }

  mul(num: number | string): FinMath {
    this.rightOperand = Number(num)

    const leftPrecision = this.precision.getPrecision(this.leftOperand)
    const rightPrecision = this.precision.getPrecision(this.rightOperand)
    const maxPrecision = Math.max(leftPrecision, rightPrecision)

    const multiplier = 10 ** maxPrecision
    const leftOperand = Math.round(this.leftOperand * multiplier)
    const rightOperand = Math.round(this.rightOperand * multiplier)

    const r = BigInt(leftOperand) * BigInt(rightOperand)

    this.leftOperand = Number(r) / multiplier ** 2

    return this
  }

  /**
   * Returns the result of operations.
   * The default value will be returned when operations never called.
   *
   * @returns Result of arithmetical operations
   */
  result(): number {
    return this.leftOperand
  }

  /**
   * Returns a result of operations as number with string representation.
   *
   * @returns Result of arithmetical operations
   */
  resultAsString(): string {
    return this.leftOperand.toString()
  }
}
