# Architecture Notes: power-function

## Problem Statement
Add a power function to the calculator that can calculate a number raised to a power (exponentiation).

## System Components Affected

### Core Module
- [x] Calculator class: Add new power method
- [x] Method signature: `power(base, exponent)`
- [x] Input validation: Handle edge cases
- [x] Error handling: Invalid inputs

### Testing
- [x] Unit tests: Test the power function
- [x] Edge cases: Test special values (0, negative, fractional)
- [x] Integration: Ensure compatibility with existing methods

### Documentation
- [x] Code comments: Document the power method
- [x] README update: Add power function to feature list

## Implementation Details

### Method Design
```javascript
power(base, exponent) {
  // Handles mathematical exponentiation
  // Supports negative and fractional exponents
  return Math.pow(base, exponent);
}
```

### Edge Cases to Handle
1. **Zero base**: 0^n = 0 (except 0^0)
2. **Zero exponent**: n^0 = 1 (including 0^0 = 1)
3. **Negative exponents**: n^-m = 1/(n^m)
4. **Fractional exponents**: n^(1/2) = sqrt(n)
5. **Large numbers**: Consider overflow scenarios

## Task Breakdown

### Task 1: Implement Power Method
- Add power method to Calculator class
- Use JavaScript's Math.pow() for calculation
- Follow existing code style and patterns

### Task 2: Add Input Validation
- Validate that inputs are numbers
- Handle NaN and Infinity cases appropriately
- Maintain consistency with existing error handling

### Task 3: Create Unit Tests
- Test normal cases (positive integers)
- Test edge cases (0, negative, fractional)
- Test error scenarios
- Ensure 100% code coverage for new method

### Task 4: Update Documentation
- Add method comment following existing pattern
- Update README if needed
- Document any special behaviors

## Risk Assessment

### Low Risk
- Simple mathematical operation
- Built-in JavaScript support via Math.pow()
- No breaking changes to existing functionality
- No external dependencies

### Mitigation
- Comprehensive testing of edge cases
- Clear documentation of behavior
- Following existing code patterns

## Success Metrics
- Power function correctly calculates exponentiation
- All tests pass including edge cases
- Code follows existing patterns and style
- No regression in existing functionality