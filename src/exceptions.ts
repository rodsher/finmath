/**
 * The file contains public and private exceptions that the library can throw.
 * All exceptions that can be caught in a client code contains the `@public` annotation in the JSDoc.
 * Code coverage disabled for this file because it does not contain conditional logic or branches.
 *
 * @fileoverview
 */
/* istanbul ignore file */

/**
 * The ArgumentIsGreaterThanMaxError throws when a given argument is greater than a constant Number.MAX_SAFE_INTEGER.
 * The value of Number.MAX_SAFE_INTEGER is 9007199254740991 (2^53 − 1).
 *
 * @class
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
 * The ArgumentIsLessThanMinError throws when a given argument is less than a constant Number.MIN_SAFE_INTEGER.
 * The value of Number.MIN_SAFE_INTEGER is −9007199254740991, (−(2^53 − 1)).
 *
 * @class
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

/**
 * The InvalidNumberError throws when a given value had invalid format.
 *
 * Valid formars for numbers:
 * - 100
 * - +100
 * - -100
 * - 100.0
 * - +100.0
 * - -100.0
 *
 * Valid formats for string representation of numbers:
 * - '100'
 * - '+100'
 * - '-100'
 * - '100.0'
 * - '+100.0'
 * - '-100.0'
 *
 * @class
 * @public
 */
export class InvalidNumberError extends Error {
  /**
   * @constructor
   * @param num Invalid value.
   */
  constructor(num: number | string) {
    super(`Given argument ${num} is not a valid integer or decimal`)
  }
}

/**
 * The InvalidBigIntMultiplierError throws when given multiplier is less than 1.
 * Multiplier for bigint must be greater or equal than zero.
 *
 * @class
 * @public
 */
export class InvalidBigIntMultiplierError extends Error {
  /**
   * @constructor
   * @param num Multiplier value.
   */
  constructor(num: number | string) {
    super(`Multiplier must be > 0, given ${num} is less or equal to zero`)
  }
}
