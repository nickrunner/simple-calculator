# Test Project

A simple calculator project for testing the multi-agent development system.

## Files
- `calculator.js` - Basic calculator class with add, subtract, multiply, divide, and power operations
- `package.json` - Node.js project configuration

## Usage
```javascript
const Calculator = require('./calculator');
const calc = new Calculator();
console.log(calc.add(2, 3)); // 5
console.log(calc.subtract(5, 2)); // 3
console.log(calc.multiply(3, 4)); // 12
console.log(calc.divide(10, 2)); // 5
console.log(calc.power(2, 3)); // 8
```