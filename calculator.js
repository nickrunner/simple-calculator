// Simple calculator module
class Calculator {
  /**
   * Adds two numbers together
   * @param {number} a - The first number
   * @param {number} b - The second number
   * @returns {number} The sum of a and b
   */
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
}

module.exports = Calculator;