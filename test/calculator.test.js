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

  describe('integrate method', () => {
    describe('basic polynomial functions', () => {
      test('should integrate constant function (f(x) = 1) from 0 to 1', () => {
        const result = calculator.integrate((x) => 1, 0, 1);
        expect(result).toBeCloseTo(1, 3);
      });

      test('should integrate linear function (f(x) = x) from 0 to 1', () => {
        // ∫[0,1] x dx = 0.5
        const result = calculator.integrate((x) => x, 0, 1);
        expect(result).toBeCloseTo(0.5, 3);
      });

      test('should integrate quadratic function (f(x) = x²) from 0 to 1', () => {
        // ∫[0,1] x² dx = 1/3
        const result = calculator.integrate((x) => x * x, 0, 1);
        expect(result).toBeCloseTo(1/3, 3);
      });

      test('should integrate cubic function (f(x) = x³) from 0 to 2', () => {
        // ∫[0,2] x³ dx = 4
        const result = calculator.integrate((x) => x * x * x, 0, 2);
        expect(result).toBeCloseTo(4, 3);
      });
    });

    describe('trigonometric functions', () => {
      test('should integrate sin(x) from 0 to π', () => {
        // ∫[0,π] sin(x) dx = 2
        const result = calculator.integrate(Math.sin, 0, Math.PI);
        expect(result).toBeCloseTo(2, 3);
      });

      test('should integrate cos(x) from 0 to π/2', () => {
        // ∫[0,π/2] cos(x) dx = 1
        const result = calculator.integrate(Math.cos, 0, Math.PI / 2);
        expect(result).toBeCloseTo(1, 3);
      });

      test('should integrate sin(x) from 0 to 2π', () => {
        // ∫[0,2π] sin(x) dx = 0
        const result = calculator.integrate(Math.sin, 0, 2 * Math.PI);
        expect(result).toBeCloseTo(0, 2);
      });
    });

    describe('exponential functions', () => {
      test('should integrate e^x from 0 to 1', () => {
        // ∫[0,1] e^x dx = e - 1 ≈ 1.718
        const result = calculator.integrate(Math.exp, 0, 1);
        expect(result).toBeCloseTo(Math.E - 1, 3);
      });

      test('should integrate e^x from -1 to 1', () => {
        // ∫[-1,1] e^x dx = e - e^(-1) ≈ 2.350
        const result = calculator.integrate(Math.exp, -1, 1);
        expect(result).toBeCloseTo(Math.E - Math.exp(-1), 3);
      });
    });

    describe('edge cases', () => {
      test('should return 0 when bounds are equal', () => {
        const result = calculator.integrate((x) => x * x, 5, 5);
        expect(result).toBe(0);
      });

      test('should handle reversed bounds (swap and negate)', () => {
        // ∫[1,0] x dx should equal -∫[0,1] x dx = -0.5
        const result = calculator.integrate((x) => x, 1, 0);
        expect(result).toBeCloseTo(-0.5, 3);
      });

      test('should handle negative bounds', () => {
        // ∫[-1,1] x² dx = 2/3
        const result = calculator.integrate((x) => x * x, -1, 1);
        expect(result).toBeCloseTo(2/3, 3);
      });

      test('should use default interval count of 1000', () => {
        const result1 = calculator.integrate((x) => x, 0, 1);
        const result2 = calculator.integrate((x) => x, 0, 1, 1000);
        expect(result1).toBe(result2);
      });

      test('should allow custom interval count', () => {
        const result = calculator.integrate((x) => x * x, 0, 1, 100);
        expect(result).toBeCloseTo(1/3, 2);
      });

      test('should handle large bounds', () => {
        // ∫[0,100] x dx = 5000
        const result = calculator.integrate((x) => x, 0, 100);
        expect(result).toBeCloseTo(5000, 1);
      });
    });

    describe('input validation', () => {
      test('should throw error if first parameter is not a function', () => {
        expect(() => calculator.integrate(42, 0, 1)).toThrow('First parameter must be a function');
        expect(() => calculator.integrate('not a function', 0, 1)).toThrow('First parameter must be a function');
        expect(() => calculator.integrate(null, 0, 1)).toThrow('First parameter must be a function');
        expect(() => calculator.integrate(undefined, 0, 1)).toThrow('First parameter must be a function');
      });

      test('should throw error if bounds are not finite numbers', () => {
        expect(() => calculator.integrate((x) => x, Infinity, 1)).toThrow('Bounds must be finite numbers');
        expect(() => calculator.integrate((x) => x, 0, Infinity)).toThrow('Bounds must be finite numbers');
        expect(() => calculator.integrate((x) => x, NaN, 1)).toThrow('Bounds must be finite numbers');
        expect(() => calculator.integrate((x) => x, 0, NaN)).toThrow('Bounds must be finite numbers');
        expect(() => calculator.integrate((x) => x, 'a', 1)).toThrow('Bounds must be finite numbers');
        expect(() => calculator.integrate((x) => x, 0, 'b')).toThrow('Bounds must be finite numbers');
      });

      test('should throw error if intervals is not a positive integer', () => {
        expect(() => calculator.integrate((x) => x, 0, 1, 0)).toThrow('Number of intervals must be a positive integer');
        expect(() => calculator.integrate((x) => x, 0, 1, -10)).toThrow('Number of intervals must be a positive integer');
        expect(() => calculator.integrate((x) => x, 0, 1, 3.5)).toThrow('Number of intervals must be a positive integer');
        expect(() => calculator.integrate((x) => x, 0, 1, 'invalid')).toThrow('Number of intervals must be a positive integer');
      });

      test('should throw error if function returns non-finite values', () => {
        // Function that returns Infinity
        expect(() => calculator.integrate((x) => 1/x, 0, 1)).toThrow('Function returned non-finite value');

        // Function that returns NaN
        expect(() => calculator.integrate((x) => Math.sqrt(-1), 0, 1)).toThrow('Function returned non-finite value');
      });
    });

    describe('numerical accuracy', () => {
      test('should improve accuracy with more intervals', () => {
        const exact = 1/3;
        const result100 = calculator.integrate((x) => x * x, 0, 1, 100);
        const result1000 = calculator.integrate((x) => x * x, 0, 1, 1000);
        const result10000 = calculator.integrate((x) => x * x, 0, 1, 10000);

        const error100 = Math.abs(result100 - exact);
        const error1000 = Math.abs(result1000 - exact);
        const error10000 = Math.abs(result10000 - exact);

        expect(error1000).toBeLessThan(error100);
        expect(error10000).toBeLessThan(error1000);
      });
    });

    describe('mathematical properties', () => {
      test('linearity: ∫(f + g) should equal ∫f + ∫g', () => {
        const f = (x) => x;
        const g = (x) => x * x;
        const fPlusG = (x) => f(x) + g(x);

        const integralF = calculator.integrate(f, 0, 1);
        const integralG = calculator.integrate(g, 0, 1);
        const integralFPlusG = calculator.integrate(fPlusG, 0, 1);

        expect(integralFPlusG).toBeCloseTo(integralF + integralG, 3);
      });

      test('additivity: ∫[a,c] f should equal ∫[a,b] f + ∫[b,c] f', () => {
        const f = (x) => x * x;
        const a = 0, b = 1, c = 2;

        const integralAC = calculator.integrate(f, a, c);
        const integralAB = calculator.integrate(f, a, b);
        const integralBC = calculator.integrate(f, b, c);

        expect(integralAC).toBeCloseTo(integralAB + integralBC, 3);
      });

      test('reversal: ∫[a,b] f should equal -∫[b,a] f', () => {
        const f = (x) => x * x;
        const integralAB = calculator.integrate(f, 0, 2);
        const integralBA = calculator.integrate(f, 2, 0);

        expect(integralAB).toBeCloseTo(-integralBA, 3);
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