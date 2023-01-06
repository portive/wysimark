/**
 * Takes a function and returns a new function with the first X arguments of
 * that function pre-filled with the provided values.
 *
 * NOTE:
 *
 * This is not a full implementation of a curry but gives us what we want in a
 * lightweight manner, with low complexity and good typing. Namely, we need to
 * specify how many arguments to curry.
 *
 * This can probably be done in a way where the argument number doesn't have to
 * be specified ahead of time; however, these are the reasons I've kept it this
 * way for now.
 *
 * - It's easier to understand. We don't need to create a recursive TypeScript
 *   type.
 * - We only ever need currying a little anyways
 * - It's probably a little more performant this way
 *
 * WARNING FOR GENERICS:
 *
 * If the function you are currying has a generic, you will need to write a
 * generic manually for it then apply it manually using `as`. For example:
 *
 * const curriedToggleElements = curry(toggleElements, editor) as
 *   CurriedToggleElements
 */

/**
 * Curry one argument from the left
 */
export function curryOne<CurriedArg, RestArgs extends unknown[], R>(
  fn: (curriedArg: CurriedArg, ...restArgs: RestArgs) => R,
  curriedArg: CurriedArg
): (...args: RestArgs) => R {
  return fn.bind(null, curriedArg)
}

/**
 * Curry two arguments from the left
 */
export function curryTwo<Arg1, Arg2, RestArgs extends unknown[], R>(
  fn: (arg1: Arg1, arg2: Arg2, ...restArgs: RestArgs) => R,
  arg1: Arg1,
  arg2: Arg2
): (...args: RestArgs) => R {
  return fn.bind(null, arg1, arg2)
}
