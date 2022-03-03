import { ArgumentIsGreaterThanMaxError } from '../src/exceptions'
import { Math } from '../src/finmath'

describe('Math', () => {
  describe('constructor', () => {
    it('should create an instance of Math without exception when all arguments passed', () => {
      expect(() => new Math(1)).not.toThrow()
    })

    it('should create an instance of Math without exception when no argument provided', () => {
      expect(() => new Math()).not.toThrow()
    })
  })

  describe('fromNumber', () => {
    it('should throw exception when a passed number is greater than MAX_SAFE_INTEGER', () => {
      expect(() => Math.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrowError(
        'Given argument is greater than a MAX_SAFE_INTEGER: 9007199254740992 > 9007199254740991'
      )
    })

    it('should throw exception when a passed number is less than MIN_SAFE_INTEGER', () => {
      expect(() => Math.fromNumber(Number.MIN_SAFE_INTEGER - 1)).toThrowError('')
    })

    it('should not throw exception when a number equals MAX_SAFE_INTEGER', () => {
      expect(() => Math.fromNumber(Number.MAX_SAFE_INTEGER)).not.toThrow()
    })

    it('should not throw exception when a number equals MIN_SAFE_INTEGER', () => {
      expect(() => Math.fromNumber(Number.MIN_SAFE_INTEGER)).not.toThrow()
    })

    it('should not throw exception when a number between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER', () => {
      expect(() => Math.fromNumber(Number.MAX_SAFE_INTEGER - 1)).not.toThrow()
      expect(() => Math.fromNumber(Number.MIN_SAFE_INTEGER + 1)).not.toThrow()
    })

    it('should return an instance of Math when a number equals zero', () => {
      expect(Math.fromNumber(0)).toBeInstanceOf(Math)
    })

    it('should return an instance of Math when a number is positive', () => {
      expect(Math.fromNumber(1)).toBeInstanceOf(Math)
    })

    it('should return an instance of Math when a number is negative', () => {
      expect(Math.fromNumber(-1)).toBeInstanceOf(Math)
    })
  })

  /*

  describe('fromString', () => {
    test.todo('should throw exception when given string is not valid number')
    test.todo('should pass validation when given string is a valid integer')
    test.todo('should pass validation when given string is a valid float')
    test.todo('should pass validation when given string is a postestitodo number')
    test.todo('should pass validation when given string is a negative number')
  })

  */
})
