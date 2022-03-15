/**
 * Returns true if type T and U are the same
 */

// export type IsEqual<T, U> = [T] extends [U]
//   ? [U] extends [T]
//     ? true
//     : false
//   : false

// /**
//  * Call this method with the argument `true` and then pass in two generics.
//  *
//  * If the two generics are not equal, the method call will result in a type
//  * error.
//  *
//  * This is particularly useful to make sure that an array of values is exactly
//  * equal to a calculated type. For example, we may want to have an array that
//  * contains all the `type` values for `InlineElement`s.
//  */

// export function assertTypeEqual<A, B>(value: IsEqual<A, B>): B {
//   return {} as B
// }

/**
 * Prettify a type to improve readability.
 *
 * This doesn't work for all types but is sufficiently useful to flatten and
 * inspect in most cases.
 */
export type Prettify<T> = T extends infer U
  ? { [K in keyof U]: Prettify<U[K]> }
  : never
