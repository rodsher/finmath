// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

import { ArgumentIsGreaterThanMaxError, ArgumentIsLessThanMinError } from './exceptions'

export class Math {
  private leftOperand: number
  private rightOperand!: number

  constructor(num: number)
  constructor(num?: number) {
    this.leftOperand = num ?? 0
  }

  static fromNumber(num: number): Math {
    if (num > Number.MAX_SAFE_INTEGER) {
      throw new ArgumentIsGreaterThanMaxError(num)
    }

    if (num < Number.MIN_SAFE_INTEGER) {
      throw new ArgumentIsLessThanMinError(num)
    }

    return new Math(num)
  }

  // static fromString(num: string): Finmath

  // randomFloat()
  // randomBetween()
  // randomInt()
  // randomIntBetween()
  // round()
  // floor()
  // sign()
  // pow(x, y)
  // max()
  // min()
  // trunc()
  // toString()
  // toPrecision()
  // result()

  // add() {}
  // sub()
  // mul()
  // div()

  // classes:
  // - NumberPrecision
  // - NumberValidator
}
