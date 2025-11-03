const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('existing methods', () => {
    test('add should return sum of two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('subtract should return difference of two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('multiply should return product of two numbers', () => {
      expect(calculator.multiply(4, 3)).toBe(12);
    });

    test('divide should return quotient of two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('divide should throw error for division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('power method', () => {
    describe('positive integer exponents', () => {
      test('should calculate 2^3 correctly', () => {
        expect(calculator.power(2, 3)).toBe(8);
      });

      test('should calculate 5^2 correctly', () => {
        expect(calculator.power(5, 2)).toBe(25);
      });

      test('should calculate 10^4 correctly', () => {
        expect(calculator.power(10, 4)).toBe(10000);
      });

      test('should handle base 1 with any exponent', () => {
        expect(calculator.power(1, 100)).toBe(1);
      });
    });

    describe('negative exponents', () => {
      test('should calculate 2^-1 correctly', () => {
        expect(calculator.power(2, -1)).toBe(0.5);
      });

      test('should calculate 4^-2 correctly', () => {
        expect(calculator.power(4, -2)).toBe(0.0625);
      });

      test('should calculate 10^-3 correctly', () => {
        expect(calculator.power(10, -3)).toBe(0.001);
      });
    });

    describe('zero exponent', () => {
      test('any positive number to power 0 should return 1', () => {
        expect(calculator.power(5, 0)).toBe(1);
        expect(calculator.power(100, 0)).toBe(1);
        expect(calculator.power(0.5, 0)).toBe(1);
      });

      test('negative number to power 0 should return 1', () => {
        expect(calculator.power(-5, 0)).toBe(1);
        expect(calculator.power(-100, 0)).toBe(1);
      });
    });

    describe('fractional exponents', () => {
      test('should calculate square root (power 0.5)', () => {
        expect(calculator.power(4, 0.5)).toBe(2);
        expect(calculator.power(9, 0.5)).toBe(3);
      });

      test('should calculate cube root (power 1/3)', () => {
        expect(calculator.power(8, 1/3)).toBeCloseTo(2, 10);
        expect(calculator.power(27, 1/3)).toBeCloseTo(3, 10);
      });

      test('should handle other fractional exponents', () => {
        expect(calculator.power(16, 0.25)).toBe(2);
        expect(calculator.power(32, 0.2)).toBe(2);
      });
    });

    describe('edge cases', () => {
      test('0^0 should return 1 (programming convention)', () => {
        expect(calculator.power(0, 0)).toBe(1);
      });

      test('0 to any positive power should return 0', () => {
        expect(calculator.power(0, 5)).toBe(0);
        expect(calculator.power(0, 100)).toBe(0);
        expect(calculator.power(0, 0.5)).toBe(0);
      });

      test('0 to negative power should return Infinity', () => {
        expect(calculator.power(0, -1)).toBe(Infinity);
        expect(calculator.power(0, -5)).toBe(Infinity);
      });

      test('negative base with integer exponent should work', () => {
        expect(calculator.power(-2, 2)).toBe(4);
        expect(calculator.power(-2, 3)).toBe(-8);
        expect(calculator.power(-3, 2)).toBe(9);
        expect(calculator.power(-3, 3)).toBe(-27);
      });

      test('negative base with non-integer exponent should throw error', () => {
        expect(() => calculator.power(-2, 0.5)).toThrow('Negative base with non-integer exponent results in complex number');
        expect(() => calculator.power(-4, 1.5)).toThrow('Negative base with non-integer exponent results in complex number');
        expect(() => calculator.power(-1, 0.3)).toThrow('Negative base with non-integer exponent results in complex number');
      });

      test('very large results should be handled', () => {
        expect(calculator.power(10, 308)).toBe(1e308);
        expect(calculator.power(2, 1024)).toBe(Infinity);
      });

      test('very small results should be handled', () => {
        expect(calculator.power(10, -308)).toBe(1e-308);
        expect(calculator.power(2, -1074)).toBe(5e-324);
      });
    });

    describe('mathematical properties', () => {
      test('a^1 should equal a', () => {
        expect(calculator.power(5, 1)).toBe(5);
        expect(calculator.power(-3, 1)).toBe(-3);
        expect(calculator.power(0.5, 1)).toBe(0.5);
      });

      test('a^b * a^c should equal a^(b+c)', () => {
        const base = 2;
        const exp1 = 3;
        const exp2 = 4;
        const result1 = calculator.power(base, exp1) * calculator.power(base, exp2);
        const result2 = calculator.power(base, exp1 + exp2);
        expect(result1).toBeCloseTo(result2, 10);
      });

      test('(a^b)^c should equal a^(b*c)', () => {
        const base = 2;
        const exp1 = 3;
        const exp2 = 2;
        const result1 = calculator.power(calculator.power(base, exp1), exp2);
        const result2 = calculator.power(base, exp1 * exp2);
        expect(result1).toBeCloseTo(result2, 10);
      });
    });
  });

  describe('modulo method', () => {
    describe('positive integers', () => {
      test('should calculate 10 % 3 correctly', () => {
        expect(calculator.modulo(10, 3)).toBe(1);
      });

      test('should calculate 15 % 4 correctly', () => {
        expect(calculator.modulo(15, 4)).toBe(3);
      });

      test('should calculate 20 % 5 correctly', () => {
        expect(calculator.modulo(20, 5)).toBe(0);
      });

      test('should calculate 7 % 2 correctly', () => {
        expect(calculator.modulo(7, 2)).toBe(1);
      });

      test('should return 0 when dividend is divisible by divisor', () => {
        expect(calculator.modulo(10, 2)).toBe(0);
        expect(calculator.modulo(100, 10)).toBe(0);
        expect(calculator.modulo(9, 3)).toBe(0);
      });

      test('should handle when dividend is smaller than divisor', () => {
        expect(calculator.modulo(3, 5)).toBe(3);
        expect(calculator.modulo(2, 10)).toBe(2);
        expect(calculator.modulo(7, 8)).toBe(7);
      });
    });

    describe('negative numbers', () => {
      test('should handle negative dividend with positive divisor', () => {
        expect(calculator.modulo(-10, 3)).toBe(-1);
        expect(calculator.modulo(-15, 4)).toBe(-3);
        expect(calculator.modulo(-7, 2)).toBe(-1);
      });

      test('should handle positive dividend with negative divisor', () => {
        expect(calculator.modulo(10, -3)).toBe(1);
        expect(calculator.modulo(15, -4)).toBe(3);
        expect(calculator.modulo(7, -2)).toBe(1);
      });

      test('should handle both negative dividend and divisor', () => {
        expect(calculator.modulo(-10, -3)).toBe(-1);
        expect(calculator.modulo(-15, -4)).toBe(-3);
        expect(calculator.modulo(-7, -2)).toBe(-1);
      });

      test('should return 0 for negative divisible numbers', () => {
        expect(calculator.modulo(-10, 2)).toBe(-0);
        expect(calculator.modulo(-100, -10)).toBe(-0);
        expect(calculator.modulo(9, -3)).toBe(0);
      });
    });

    describe('decimal/floating-point numbers', () => {
      test('should handle decimal dividend', () => {
        expect(calculator.modulo(10.5, 3)).toBeCloseTo(1.5, 10);
        expect(calculator.modulo(15.7, 4)).toBeCloseTo(3.7, 10);
        expect(calculator.modulo(7.5, 2)).toBeCloseTo(1.5, 10);
      });

      test('should handle decimal divisor', () => {
        expect(calculator.modulo(10, 3.5)).toBeCloseTo(3, 10);
        expect(calculator.modulo(15, 4.5)).toBeCloseTo(1.5, 10);
        expect(calculator.modulo(7, 2.5)).toBeCloseTo(2, 10);
      });

      test('should handle both decimal dividend and divisor', () => {
        expect(calculator.modulo(10.5, 3.5)).toBeCloseTo(0, 10);
        expect(calculator.modulo(15.7, 4.2)).toBeCloseTo(3.1, 10);
        expect(calculator.modulo(7.8, 2.3)).toBeCloseTo(0.9, 10);
      });

      test('should handle very small decimal numbers', () => {
        expect(calculator.modulo(0.5, 0.2)).toBeCloseTo(0.1, 10);
        expect(calculator.modulo(0.7, 0.3)).toBeCloseTo(0.1, 10);
        expect(calculator.modulo(1.5, 0.4)).toBeCloseTo(0.3, 10);
      });
    });

    describe('edge cases', () => {
      test('should throw error for modulo by zero', () => {
        expect(() => calculator.modulo(10, 0)).toThrow('Modulo by zero');
        expect(() => calculator.modulo(-10, 0)).toThrow('Modulo by zero');
        expect(() => calculator.modulo(0, 0)).toThrow('Modulo by zero');
      });

      test('should handle 0 as dividend', () => {
        expect(calculator.modulo(0, 5)).toBe(0);
        expect(calculator.modulo(0, -5)).toBe(0);
        expect(calculator.modulo(0, 0.5)).toBe(0);
      });

      test('should handle modulo by 1', () => {
        expect(calculator.modulo(10, 1)).toBe(0);
        expect(calculator.modulo(5.7, 1)).toBeCloseTo(0.7, 10);
        expect(calculator.modulo(-10, 1)).toBe(-0);
      });

      test('should handle modulo by -1', () => {
        expect(calculator.modulo(10, -1)).toBe(0);
        expect(calculator.modulo(5.7, -1)).toBeCloseTo(0.7, 10);
        expect(calculator.modulo(-10, -1)).toBe(-0);
      });

      test('should handle very large numbers', () => {
        expect(calculator.modulo(1e10, 7)).toBe(4);
        expect(calculator.modulo(1e15, 13)).toBe(12);
        expect(calculator.modulo(Number.MAX_SAFE_INTEGER, 10)).toBe(1);
      });

      test('should handle very small (close to zero) divisors', () => {
        expect(calculator.modulo(1, 0.001)).toBeCloseTo(0.001, 5);
        expect(calculator.modulo(1, 0.0001)).toBeCloseTo(0.0001, 4);
        expect(calculator.modulo(0.5, 0.001)).toBeCloseTo(0.001, 4);
      });

      test('should handle Infinity', () => {
        expect(calculator.modulo(10, Infinity)).toBe(10);
        expect(calculator.modulo(Infinity, 10)).toBe(NaN);
        expect(calculator.modulo(Infinity, Infinity)).toBe(NaN);
      });

      test('should handle NaN', () => {
        expect(calculator.modulo(NaN, 10)).toBe(NaN);
        expect(calculator.modulo(10, NaN)).toBe(NaN);
        expect(calculator.modulo(NaN, NaN)).toBe(NaN);
      });
    });

    describe('mathematical properties', () => {
      test('(a + b) % c should equal ((a % c) + (b % c)) % c', () => {
        const a = 17;
        const b = 23;
        const c = 7;
        const result1 = calculator.modulo(a + b, c);
        const result2 = calculator.modulo(calculator.modulo(a, c) + calculator.modulo(b, c), c);
        expect(result1).toBe(result2);
      });

      test('a % b should always be less than |b| in magnitude', () => {
        const testCases = [
          [10, 3],
          [-10, 3],
          [10, -3],
          [-10, -3],
          [100, 7],
          [5.5, 2.2]
        ];

        testCases.forEach(([a, b]) => {
          const result = calculator.modulo(a, b);
          expect(Math.abs(result)).toBeLessThan(Math.abs(b));
        });
      });

      test('if a % b = r, then a = qb + r for some integer q', () => {
        const testCases = [
          [10, 3],
          [15, 4],
          [-10, 3],
          [10, -3]
        ];

        testCases.forEach(([a, b]) => {
          const r = calculator.modulo(a, b);
          const q = Math.trunc(a / b);
          expect(a).toBeCloseTo(q * b + r, 10);
        });
      });
    });
  });
});