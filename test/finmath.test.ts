import { FinMath as math } from '../src/finmath'

describe('Math', () => {
  describe('constructor', () => {
    it('should create an instance of Math without exception when all arguments passed', () => {
      expect(() => new math(1)).not.toThrow()
    })

    it('should create an instance of Math without exception when no argument provided', () => {
      expect(() => new math()).not.toThrow()
    })
  })

  describe('fromNumber', () => {
    it('should throw exception when a passed number is greater than MAX_SAFE_INTEGER', () => {
      expect(() => math.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrowError(
        'Given argument is greater than a MAX_SAFE_INTEGER: 9007199254740992 > 9007199254740991'
      )
    })

    it('should throw exception when a passed number is less than MIN_SAFE_INTEGER', () => {
      expect(() => math.fromNumber(Number.MIN_SAFE_INTEGER - 1)).toThrowError('')
    })

    it('should not throw exception when a number equals MAX_SAFE_INTEGER', () => {
      expect(() => math.fromNumber(Number.MAX_SAFE_INTEGER)).not.toThrow()
    })

    it('should not throw exception when a number equals MIN_SAFE_INTEGER', () => {
      expect(() => math.fromNumber(Number.MIN_SAFE_INTEGER)).not.toThrow()
    })

    it('should not throw exception when a number between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER', () => {
      expect(() => math.fromNumber(Number.MAX_SAFE_INTEGER - 1)).not.toThrow()
      expect(() => math.fromNumber(Number.MIN_SAFE_INTEGER + 1)).not.toThrow()
    })

    it('should return an instance of Math when a number equals zero', () => {
      expect(math.fromNumber(0)).toBeInstanceOf(math)
    })

    it('should return an instance of Math when a number is positive', () => {
      expect(math.fromNumber(1)).toBeInstanceOf(math)
    })

    it('should return an instance of Math when a number is negative', () => {
      expect(math.fromNumber(-1)).toBeInstanceOf(math)
    })
  })

  describe('add', () => {
    // it.todo('negative numbers')
    // it.todo('zeros')
    // it.todo('integers')
    // it.todo('min safe interger')
    // it.todo('max safe interger')
    // it.todo('different precision: 0, 1; 1, 0; 1, 1; 1, 2; 2, 1; 1, 4; 4, 1; 1, 8; 8, 1;')

    it('should return a correct result when add two decimals with a same precision', () => {
      expect(
        math
          .fromNumber(0.1)
          .add(0.2)
          .result()
      ).toBe(0.3)
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
