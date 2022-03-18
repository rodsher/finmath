/**
 * File contains library constants.
 * Code coverage disabled for this file because it does not contain conditional logic or branches.
 *
 * @fileoverview
 */
/* istanbul ignore file */

/**
 * Describes a precision value for integers.
 *
 * @example
 * // Example of usage constant:
 * const precision = new NumberPrecision()
 *
 * if (precision.compute(100) === ZERO_PRECISION) {
 *   ...
 * }
 *
 * @constant
 * @public
 */
export const ZERO_PRECISION = 0

/**
 * Describes a Regular Expression for an integer number.
 *
 * @example
 * // Examples:
 * INTEGER_REGEXP.test('100') // true
 * INTEGER_REGEXP.test('+100') // true
 * INTEGER_REGEXP.test('-100') // true
 * INTEGER_REGEXP.test('100.00') // false
 *
 * @constant
 */
export const INTEGER_REGEXP = /^(-|\+)?\d+$/

/**
 * Describes a Regular Expression for a float number.
 *
 * @example
 * // Examples:
 * FLOAT_REGEXP.test('100.00') // true
 * FLOAT_REGEXP.test('100.00000001') // true
 * FLOAT_REGEXP.test('100.00000000000001') // true
 * FLOAT_REGEXP.test('100') // false
 *
 * @constant
 */
export const FLOAT_REGEXP = /^(-|\+)?(\d+)\.(\d+)$/

/**
 * Describes a Regular Expression for a float number in scientific notation.
 *
 * @example
 * // Examples:
 * SCIENTIFIC_NOTATION_REGEXP.test('2.5e25') // true
 * SCIENTIFIC_NOTATION_REGEXP.test('-1.123e-10') // true
 * SCIENTIFIC_NOTATION_REGEXP.test('-1e-3') // true
 * SCIENTIFIC_NOTATION_REGEXP.test('-1.2e-2') // true
 * SCIENTIFIC_NOTATION_REGEXP.test('100') // false
 * SCIENTIFIC_NOTATION_REGEXP.test('100.1') // false
 *
 * @constant
 */
export const SCIENTIFIC_NOTATION_REGEXP = /\d+\.?\d*e[\+\-]*\d+/i
