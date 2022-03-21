import { FinMath as math } from '../src/math'

describe('FinMath', () => {
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

  /*

  describe('fromString', () => {
    test.todo('should throw exception when given string is not valid number')
    test.todo('should pass validation when given string is a valid integer')
    test.todo('should pass validation when given string is a valid float')
    test.todo('should pass validation when given string is a postestitodo number')
    test.todo('should pass validation when given string is a negative number')
  })

  */

  describe('add', () => {
    it.each([
      [0, 0, 0],
      [0.0, 0, 0.0],
      [0, 0.0, 0.0],
      [0.0, 0.0, 0.0],

      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, -2],

      [-0.00007, 0.00006, -0.00001],
      [0.00007, -0.00006, 0.00001],
      [-0.00007, -0.00006, -0.00013],

      [89_9999_9999_9999, 1, 90_0000_0000_0000],
      [90_0000_0000_0000, -1, 89_9999_9999_9999],

      [1, 0.1, 1.1],
      [1, 0.01, 1.01],
      [1, 0.001, 1.001],
      [1, 0.0001, 1.0001],
      [1, 0.00001, 1.00001],
      [1, 0.000001, 1.000001],
      [1, 0.0000001, 1.0000001],
      [1, 0.00000001, 1.00000001]
    ])('add(%d, %d) === %d', (firstInput, secondInput, expected) => {
      expect(
        math
          .fromNumber(firstInput)
          .add(secondInput)
          .result()
      ).toBe(expected)
    })
  })

  describe('sub', () => {
    it.each([
      [0, 0, 0],
      [0.0, 0.0, 0.0],
      [-1, -1, 0.0],
      [-1.0, -1.0, 0.0],
      [-2.0, -1.0, -1.0],
      [10.00010001, 0.0001, 10.00000001],
      [89999999999999, 1, 89999999999998],
      [Number.MAX_SAFE_INTEGER, 1, 9007199254740990],
      [Number.MIN_SAFE_INTEGER, -1, -9007199254740990]
    ])('sub(%d, %d) === %d', (firstOperand, secondOperand, expected) => {
      expect(
        math
          .fromNumber(firstOperand)
          .sub(secondOperand)
          .result()
      ).toBe(expected)
    })
  })

  describe('mul', () => {
    it.each([
      [0.375, 0.0000125, 0.0000046875],
      [0.0007, 0.0006, 0.00000042],
      [0.00093, 0.003, 0.00000279],
      [100.502, 10.1, 1015.0702]
    ])('mul(%d, %d) === %d', (firstOperand, secondOperand, expected) => {
      expect(
        math
          .fromNumber(firstOperand)
          .mul(secondOperand)
          .result()
      ).toBe(expected)
    })
  })

  describe('result', () => {
    it('should return result after a single operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.0)
          .result()
      ).toBe(100.0)
    })

    it('should return result after a double operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.25)
          .add(100.25)
          .result()
      ).toBe(200.5)
    })

    it('should return result after a triple operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.25)
          .add(100.25)
          .add(100.25)
          .result()
      ).toBe(300.75)
    })

    it('should return default value when operations never called', () => {
      expect(new math().result()).toBe(0)
    })

    it('should return left operand when result requested after initialization', () => {
      expect(math.fromNumber(100).result()).toBe(100)
      expect(math.fromNumber(100.25).result()).toBe(100.25)
    })
  })

  describe('resultAsString', () => {
    it('should return result after a single operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.25)
          .resultAsString()
      ).toBe('100.25')
    })

    it('should return result after a double operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.25)
          .add(100.25)
          .resultAsString()
      ).toBe('200.5')
    })

    it('should return result after a triple operation', () => {
      expect(
        math
          .fromNumber(0)
          .add(100.25)
          .add(100.25)
          .add(100.25)
          .resultAsString()
      ).toBe('300.75')
    })

    it('should return default value when operations never called', () => {
      expect(new math().resultAsString()).toBe('0')
    })

    it('should return left operand when result requested after initialization', () => {
      expect(math.fromNumber(100).resultAsString()).toBe('100')
      expect(math.fromNumber(100.25).resultAsString()).toBe('100.25')
    })
  })
})
