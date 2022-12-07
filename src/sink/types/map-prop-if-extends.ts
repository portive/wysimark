/**
 * Takes a Tuple and extracts the property at a given key K if the item in the
 * Tuple extends a given X.
 *
 * e.g.
 * type Mapped = MapPropIfExtends<[{a: 1}, {a: "alpha"}], {a: string}, 'a'>
 *
 * => [{a: 'alpha'}]
 *
 * Inspired from
 * https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
 *
 * Uses Recursive Conditional Types in TS 4.1
 * https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
 */
export type MapPropIfExtends<
  T extends unknown[],
  X extends Record<string, unknown>,
  K extends keyof X
> = T extends []
  ? [] // if it's an empty tuple, return the empty tuple
  : T extends [infer H, ...infer R] // breaks into `H`ead and `R`est
  ? H extends X
    ? // if it extends our X, then grab the prop `H[K]` and recurse
      [H[K], ...MapPropIfExtends<R, X, K>]
    : // if it doesn't extend our X, then skip it and recurse
      MapPropIfExtends<R, X, K>
  : T
