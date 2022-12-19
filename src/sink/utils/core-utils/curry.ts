/**
 * Takes (argument 1) a function and pre-fills the first argument of that
 * function with (argument 2) the value to pre-fill the function with.
 *
 * Returns a new function with the first argument of the function pre-filled
 * using the 2nd arguments.
 *
 * NOTE:
 *
 * This is not a full implementation of a curry but gives us what we want in
 * a lightweight manner, with low complexity and good typing.
 */
export function curry<CA, RA extends unknown[], R>(
  fn: (curriedArg: CA, ...restArgs: RA) => R,
  curriedArg: CA
): (...args: RA) => R {
  return fn.bind(null, curriedArg)
}
