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
}

module.exports = Calculator;