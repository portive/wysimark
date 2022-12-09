/**
 * Takes a function and some value which satisfies just the first argument in
 * the function.
 *
 * Returns a new function with the first argument of the function pre-filled
 * using the 2nd arguments.
 *
 * NOTE:
 *
 * This is not a full implementation of a curry but gives us what we want in
 * a lightweight manner with low complexity
 */
export function curry<CA, RA extends unknown[], R>(
  fn: (curriedArg: CA, ...restArgs: RA) => R,
  curriedArg: CA
): (...args: RA) => R {
  return fn.bind(null, curriedArg)
}
