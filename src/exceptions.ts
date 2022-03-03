/**
 * File contains exceptions that library can throw.
 *
 * @fileoverview
 */
/* istanbul ignore file */

/**
 * ArgumentIsGreaterThanMaxError throws when a given argument is greater than a constant Number.MAX_SAFE_INTEGER.
 * The value of Number.MAX_SAFE_INTEGER is 9007199254740991 (2^53 − 1).
 *
 * @public
 */
export class ArgumentIsGreaterThanMaxError extends Error {
  /**
   * @constructor
   * @param {number} num The number that passed into a Math class.
   */
  constructor(num: number) {
    super(`Given argument is greater than a MAX_SAFE_INTEGER: ${num} > ${Number.MAX_SAFE_INTEGER}`)
  }
}

/**
 * ArgumentIsLessThanMinError throws when a given argument is less than a constant Number.MIN_SAFE_INTEGER.
 * The value of Number.MIN_SAFE_INTEGER is −9007199254740991, (−(2^53 − 1)).
 *
 * @public
 */
export class ArgumentIsLessThanMinError extends Error {
  /**
   * @constructor
   * @param {number} num The number that passed into a Math class.
   */
  constructor(num: number) {
    super(`Given argument is less than a MIN_SAFE_INTEGER: ${num} < ${Number.MIN_SAFE_INTEGER}`)
  }
}
