// Simple calculator module
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
  
  // Calculates a raised to the power of b (a^b)
  power(base, exponent) {
    // Handle special case: 0^0 returns 1 (common programming convention)
    if (base === 0 && exponent === 0) {
      return 1;
    }
    
    // Check for complex number result (negative base with non-integer exponent)
    if (base < 0 && !Number.isInteger(exponent)) {
      throw new Error('Negative base with non-integer exponent results in complex number');
    }
    
    return Math.pow(base, exponent);
  }
  
  // Calculates the remainder of a divided by b (a % b)
  modulo(a, b) {
    if (b === 0) {
      throw new Error('Modulo by zero');
    }
    return a % b;
  }

  // Calculates the definite integral of a function using the Trapezoidal Rule
  // The Trapezoidal Rule approximates the area under a curve by dividing it into
  // trapezoids and summing their areas. The formula is:
  // ∫[a,b] f(x)dx ≈ (h/2) * [f(a) + 2f(x₁) + 2f(x₂) + ... + 2f(xₙ₋₁) + f(b)]
  // where h = (b - a) / n is the width of each interval
  integrate(func, lowerBound, upperBound, intervals = 1000) {
    // Validate that the first parameter is a function
    if (typeof func !== 'function') {
      throw new Error('First parameter must be a function');
    }

    // Validate that bounds are finite numbers
    if (!Number.isFinite(lowerBound) || !Number.isFinite(upperBound)) {
      throw new Error('Bounds must be finite numbers');
    }

    // Validate that intervals is a positive integer
    if (!Number.isInteger(intervals) || intervals <= 0) {
      throw new Error('Number of intervals must be a positive integer');
    }

    // Handle edge case: equal bounds means zero area
    if (lowerBound === upperBound) {
      return 0;
    }

    // Handle reversed bounds: swap them and negate the result
    // This follows the mathematical property: ∫[a,b] f(x)dx = -∫[b,a] f(x)dx
    let swapped = false;
    if (lowerBound > upperBound) {
      [lowerBound, upperBound] = [upperBound, lowerBound];
      swapped = true;
    }

    // Calculate the width of each interval
    const h = (upperBound - lowerBound) / intervals;

    // Evaluate the function at the lower bound
    let sum = func(lowerBound);

    // Check for non-finite value at the start
    if (!Number.isFinite(sum)) {
      throw new Error('Function returned non-finite value');
    }

    // Sum the function values at interior points (multiply by 2 as per formula)
    for (let i = 1; i < intervals; i++) {
      const x = lowerBound + i * h;
      const value = func(x);

      // Check for non-finite values during computation
      if (!Number.isFinite(value)) {
        throw new Error('Function returned non-finite value');
      }

      sum += 2 * value;
    }

    // Add the function value at the upper bound
    const upperValue = func(upperBound);

    // Check for non-finite value at the end
    if (!Number.isFinite(upperValue)) {
      throw new Error('Function returned non-finite value');
    }

    sum += upperValue;

    // Apply the trapezoidal formula: multiply sum by h/2
    let result = (h / 2) * sum;

    // If bounds were swapped, negate the result
    if (swapped) {
      result = -result;
    }

    return result;
  }
}

module.exports = Calculator;