import { Field } from 'o1js';

// Modular Exponentiation

function fieldModPow(base: Field, exponent: bigint): Field {
  let result = Field(1);
  let currentBase = base;
  let exp = exponent;

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = result.mul(currentBase);
    }
    currentBase = currentBase.mul(currentBase);
    exp = exp / 2n;
  }
  return result;
}

// Fifth Root Exponent

function calculateFifthRootExponent(): bigint {
  const p = Field.ORDER;
  const five = 5n;
  const two = 2n;
  const three = 3n;
  const five_inv = fieldModPow(Field(five), p - two).toBigInt();
  const exp = (five_inv * (p - three)) % p;
  return exp;
}

// Min Root Single

function minRootIteration(x: Field, y: Field): [Field, Field] {
  const fithRootExponent = calculateFifthRootExponent();
  const sum = x.add(y);
  const x_next = fieldModPow(sum, fithRootExponent);
  const y_next = x;
  return [x_next, y_next];
}

function minRoot(numIterations: number, x0: Field, y0: Field): [Field, Field] {
  let x = x0;
  let y = y0;

  for (let i = 0; i < numIterations; i++) {
    [x, y] = minRootIteration(x, y);
  }

  return [x, y];
}

export { minRoot, minRootIteration, fieldModPow, calculateFifthRootExponent };
