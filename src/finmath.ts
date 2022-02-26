// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

export default class Math {
  private leftOperand: number
  private rightOperand!: number

  constructor()
  constructor(num: number)
  constructor(num?: number) {
    this.leftOperand = num ?? 0
  }

  static fromNumber(num: number): Math {
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

  // add()
  // sub()
  // mul()
  // div()
}
