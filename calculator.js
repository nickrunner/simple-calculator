// Simple calculator module
class Calculator {
  // Adds two numbers together
  add(a, b) {
    return a + b;
  }
  
  // Subtracts the second number from the first
  subtract(a, b) {
    return a - b;
  }
  
  // Multiplies two numbers together
  multiply(a, b) {
    return a * b;
  }
  
  // Divides the first number by the second, throws error if dividing by zero
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
  
  // Calculates the power of a base number raised to an exponent
  power(base, exponent) {
    return Math.pow(base, exponent);
  }
}

module.exports = Calculator;