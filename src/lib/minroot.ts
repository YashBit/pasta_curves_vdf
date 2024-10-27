/**
 * Performs modular exponentiation (base^exponent mod modulus)
 */
function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = exponent / 2n;
  }
  return result;
}

/**
 * Calculates the expression equivalent to Rust's:
 * let five_inv = five.modpow(&(&p - &two), &p);
 * (&five_inv * (&p - &three)) % &p
 */

function calculateExpression(p: bigint): bigint {
  const two = 2n;
  const three = 3n;
  const five = 5n;

  // Calculate five_inv = 5^(p-2) mod p
  const five_inv = modPow(five, p - two, p);

  // Calculate final expression: (five_inv * (p - three)) % p
  const result = (five_inv * (p - three)) % p;

  return result;
}

// Example usage:
const p = BigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);
const result = calculateExpression(p);
console.log(result.toString());

// Export for module usage
export { modPow, calculateExpression };
