import { NumberPricision } from '../src/number-precision'

describe('NumberPrecision', () => {
  let precision: NumberPricision

  beforeAll(() => {
    precision = new NumberPricision()
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
})
