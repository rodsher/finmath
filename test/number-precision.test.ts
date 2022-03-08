import { NumberPrecision } from '../src/number-precision'

describe('NumberPrecision', () => {
  let precision: NumberPrecision

  beforeAll(() => {
    precision = new NumberPrecision()
  })

  describe('getPrecision', () => {
    describe('argument is a number', () => {
      type TestCase = [number, number]

      const positiveNumbers: TestCase[] = [
        [100.1, 1],
        [100.4, 1],
        [100.5, 1],
        [100.9, 1],

        [100.21, 2],
        [100.24, 2],
        [100.25, 2],
        [100.29, 2],

        [100.301, 3],
        [100.304, 3],
        [100.305, 3],
        [100.309, 3],

        [100.4001, 4],
        [100.4004, 4],
        [100.4005, 4],
        [100.4009, 4],

        [100.8000_0001, 8],
        [100.8000_0004, 8],
        [100.8000_0005, 8],
        [100.8000_0009, 8],

        [100.0, 0],
        [100.0_0, 0],
        [100.00_0, 0],
        [100.00_00, 0],
        [100.0000_0, 0],
        [100.0000_00, 0],
        [100.0000_000, 0],
        [100.0000_0000, 0]
      ]
      const negativeNumbers = positiveNumbers.map(([n, precision]) => [n * -1, precision])

      it.each([...positiveNumbers, ...negativeNumbers])(
        'should return correct precision when given number is a decimal with a decimal place, num: %s, precision: %d',
        (input, expected) => {
          expect(precision.getPrecision(input)).toBe(expected)
        }
      )
    })

    describe('argument is a string', () => {
      type TestCase = [string, number]

      const positiveNumbers: TestCase[] = [
        ['100.0', 1],
        ['100.4', 1],
        ['100.5', 1],
        ['100.9', 1],

        ['100.40', 2],
        ['100.50', 2],
        ['100.90', 2],

        ['100.300', 3],
        ['100.304', 3],
        ['100.305', 3],
        ['100.309', 3],

        ['100.4000', 4],
        ['100.4004', 4],
        ['100.4005', 4],
        ['100.4009', 4],

        ['100.80000000', 8],
        ['100.80000004', 8],
        ['100.80000005', 8],
        ['100.80000009', 8],

        ['100', 0],
        ['100.0', 1],
        ['100.00', 2],
        ['100.000', 3],
        ['100.0000', 4],
        ['100.00000', 5],
        ['100.000000', 6],
        ['100.0000000', 7],
        ['100.00000000', 8]
      ]
      const negativeNumbers = positiveNumbers.map(([s, precision]) => [`-${s}`, precision])

      it.each([...positiveNumbers, ...negativeNumbers])(
        'should return correct precision when given string is a decimal with a decimal place, num: %s, precision: %d',
        (input, expected) => {
          expect(precision.getPrecision(input)).toBe(expected)
        }
      )
    })
  })

  describe('setSamePrecision', () => {
    it('should return two operands with a same precision that earlier have a different precision', () => {
      expect(precision.setSamePrecision(1.5, 2.175)).toEqual(['1.500', '2.175', 3])
      expect(precision.setSamePrecision(1.00005025, 2.0)).toEqual(['1.00005025', '2.00000000', 8])
    })

    it('should return two operands with a same precision that earlier have a same precision', () => {
      expect(precision.setSamePrecision(1.125, 2.125)).toEqual(['1.125', '2.125', 3])
    })
  })

  describe('padWithZeros', () => {
    it.each([
      [['100', 0], '100'],
      [['100', 1], '100.0'],
      [['100', 2], '100.00'],
      [['100', 3], '100.000'],
      [['100', 4], '100.0000'],
      [['100', 5], '100.00000'],
      [['100', 6], '100.000000'],
      [['100', 7], '100.0000000'],
      [['100', 8], '100.00000000'],
      [['100', 9], '100.000000000'],
      [['100', 10], '100.0000000000'],
      [['100', 11], '100.00000000000'],
      [['100', 12], '100.000000000000'],
      [['100', 13], '100.0000000000000'],
      [['100', 14], '100.00000000000000'],
      [['100', 15], '100.000000000000000']
    ])('padWithZero(%s, %s)', ([input, inputPrecision], expected) => {
      expect(precision.padWithZeros(input, inputPrecision)).toBe(expected)
    })
  })
})
