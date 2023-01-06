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
 *
 * WARNING FOR GENERICS:
 *
 * If the function you are currying has a generic, you will need to write a
 * generic manually for it then apply it manually using `as`. For example:
 *
 * const curriedToggleElements =
 *   curry(toggleElements, editor) as CurriedToggleElements
 */
export function curry<CurriedArg, RestArgs extends unknown[], R>(
  fn: (curriedArg: CurriedArg, ...restArgs: RestArgs) => R,
  curriedArg: CurriedArg
): (...args: RestArgs) => R {
  return fn.bind(null, curriedArg)
}
