/**
 * This is a main library file that containts a primary class Math.
 *
 * @fileoverview
 */

/* Linter rule disabled because it does not allow methods overloading */
/* tslint:disable:unified-signatures */

import { ArgumentIsGreaterThanMaxError, ArgumentIsLessThanMinError } from './exceptions'
import { NumberPrecision } from './number-precision'
import { floatToBigInt } from './utilities'

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

  // TODO: Add JSDoc
  static fromNumber(num: number): FinMath {
    if (num > Number.MAX_SAFE_INTEGER) {
      throw new ArgumentIsGreaterThanMaxError(num)
    }

    if (num < Number.MIN_SAFE_INTEGER) {
      throw new ArgumentIsLessThanMinError(num)
    }

    return new FinMath(num)
  }

  // Planning static methods:
  // - fromString
  // - add
  // - sub
  // - mul
  // - div

  // TODO: Add JSDoc
  setLeftOperand(num: number | string): FinMath {
    this.leftOperand = Number(num)

    return this
  }

  // TODO: Add JSDoc
  setRightOperand(num: number | string): FinMath {
    this.rightOperand = Number(num)

    return this
  }

  // TODO: Add JSDoc
  add(num: number): FinMath
  add(num: string): FinMath
  add(num: number | string): FinMath {
    this.setRightOperand(num)

    const maxPrecision = this.precision.max(this.leftOperand, this.rightOperand)
    const multiplier = 10 ** maxPrecision
    const leftOperand = floatToBigInt(this.leftOperand, multiplier)
    const rightOperand = floatToBigInt(this.rightOperand, multiplier)

    const result = Number(leftOperand + rightOperand) / multiplier

    return this.setLeftOperand(result)
  }

  // TODO: Add JSDoc
  sub(num: number): FinMath
  sub(num: string): FinMath
  sub(num: number | string): FinMath {
    this.setRightOperand(num)

    const maxPrecision = this.precision.max(this.leftOperand, this.rightOperand)
    const multiplier = 10 ** maxPrecision
    const leftOperand = floatToBigInt(this.leftOperand, multiplier)
    const rightOperand = floatToBigInt(this.rightOperand, multiplier)

    const result = Number(leftOperand - rightOperand) / multiplier

    return this.setLeftOperand(result)
  }

  // TODO: Add JSDoc
  mul(num: number): FinMath
  mul(num: string): FinMath
  mul(num: number | string): FinMath {
    this.setRightOperand(num)

    const maxPrecision = this.precision.max(this.leftOperand, this.rightOperand)
    const multiplier = 10 ** maxPrecision
    const leftOperand = floatToBigInt(this.leftOperand, multiplier)
    const rightOperand = floatToBigInt(this.rightOperand, multiplier)

    const result = Number(leftOperand * rightOperand) / multiplier ** 2

    return this.setLeftOperand(result)
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
