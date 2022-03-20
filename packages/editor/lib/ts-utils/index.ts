/**
 * Utility to return the type that a Promise will return
 *
 * Also a good example of using infer
 */
export type Unpromise<T> = T extends Promise<infer U> ? U : never

/**
 * Utility to return the Item type from an Array of Item type
 *
 * <https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type>
 */
export type ItemFromArray<T extends unknown[], U = any> = T[number] extends U
  ? T[number]
  : never

/**
 * This is an example of how you should define and name a Type that takes
 * an Object type as a generic and returns a new Object type that is mapped.
 *
 * For clarity, we don't use `T extends object` because this makes sure
 * we are restricting the input property types. If we want to allow `any`
 * at least we know we are doing that because we were explicit.
 *
 * IMPORTANT!
 * We have to define generic maps like this because we can't have a generic
 * that takes generics.
 */

// type ExampleMap<T extends { [key: string]: any }> = {
//   [K in keyof T]: T[K] extends string ? string : never
// }

/**
 * Returns a type that represents all the keys in an Object that are not
 * the `never` type. Not used directly but used to remove the `never` keys
 * from an object
 *
 * The `[keyof T]` syntax works like this:
 *
 * The object that is returned has properties where the values are the type
 * of the key like `"name"` (constant string) or `never`.
 *
 * We then take that object where the values are various string constants and
 * `never` return all of its values. We are getting all of its values because
 * we are requesting at the index operator `[keyof T]`.
 *
 * The return values is all the values which are the keys and a bunch of `never`
 * types which, since they are `never`, do not end up in the resulting type
 * because they can `never` happen.
 */
type GetNotNeverKeysFromObject<T> = {
  [K in keyof T]: T[K] extends never ? never : K
}[keyof T]

/**
 * Takes an object and removes all the `never` properties from it.
 */
export type CompactMap<T extends Record<string, unknown>> = Pick<
  T,
  GetNotNeverKeysFromObject<T>
>

/**
 * Takes an object and removes all properties that match the type U
 */

export type OmitType<T, U> = CompactMap<{
  [K in keyof T]: T[K] extends U ? never : T[K]
}>

/**
 * Takes an object and keeps only properties that match U
 */

export type PickType<T, U> = CompactMap<{
  [K in keyof T]: T[K] extends U ? T[K] : never
}>

/**
 * Takes an object and maps all the keys that extend This to Then and those that
 * don't to else.
 */
export type MapIf<
  T extends Record<string, unknown>,
  This,
  Then = This,
  Else = never
> = {
  [K in keyof T]: T[K] extends This ? Then : Else
}

/**
 * Takes a type with nested generics and turns it into the end state for
 * display.
 *
 * Based on this code:
 * <https://stackoverflow.com/questions/57026210/how-to-debug-recursive-typescript-generic-type>
 *
 * - Modified to make it recursive
 * - Modified to not prettify Promise for readability
 * - Modified to handle functions
 */
// export type Prettify<T> = T extends infer U
//   ? { [K in keyof U]: Prettify<U[K]> }
//   : never

/**
 * Normalizes and flattens one level deep of an object.
 */
export type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

/**
 * This purpose of this is to remove all `?` and turn them into `... | undefined`
 * types.
 *
 * The use case currently is to make this exact match to SuperStruct which
 * doesn't add the `?` to properties. By augmenting our partials to match what
 * SuperStruct emits, we can do full assertions on SuperStruct to match with
 * our types.
 *
 * See `slate-struct.test.ts` for examples.
 *
 * A nested version of this code:
 * <https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585>
 */
export type Complete<T> = Flatten<{
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? Complete<T[P]>
    : Complete<T[P]> | undefined
}>

// prettier-ignore
export type NestedFlatten<T> =
  T extends infer U
  ? { [K in keyof U] : U[K] extends {[key: string]: any} ? NestedFlatten<U[K]> : U[K]
  } : never

// prettier-ignore
export type Prettify<T> =
  T extends (...args: infer ARGS) => infer RT ? (...args: Prettify<ARGS>) => Prettify<RT>:
  T extends Promise<infer PV> ? Promise<Prettify<PV>> :
    T extends infer U
      ? { [K in keyof U]: Prettify<U[K]> }
      : never

// prettier-ignore
export type $<T> =
  T extends (...args: infer ARGS) => infer RT ? (...args: Prettify<ARGS>) => Prettify<RT>:
  T extends Promise<infer PV> ? Promise<Prettify<PV>> :
    T extends infer U
      ? { [K in keyof U]: Prettify<U[K]> }
      : never

/**
 * If the two types are equal (either type can extends from the other type in
 * either direction) then return a type of `true` and otherwise a type of
 * `false`
 *
 * <https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-509504856>
 *
 * Use this to check for type equality
 *
 * const a: IsEqual<{a: string}, {a: string}> = true
 * const a: IsEqual<{a: string}, {a: number}> = false
 *
 * Which in this case will show an error
 */
// prettier-ignore
export type IsEqual<A, B, Y = true, N = false> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? Y : N

// prettier-ignore
export type IsExtends<A, B, Y = true, N = false> =
  A extends B ? Y : N

// // prettier-ignore
// export function assertTypeEqual<A, B>(value: IsEqual<A, B>): B {
//   return {} as B
// }
// // prettier-ignore
// export function assertTypeNotEqual<A, B>(value: IsEqual<A, B, false, true>): void {}

// function assertExtends<A, B>(value: IsExtends<A, B>): Prettify<A> {
//   return {} as Prettify<A>
// }
//
// export const assertType = {
//   true: <T>(value: IsEqual<true, T>) => {},
//   equal: assertTypeEqual,
//   notEqual: assertTypeNotEqual,
//   extends: assertExtends,
//   notExtends: <A, B>(value: IsExtends<A, B, false, true>) => {},
//   null: <T>(value: IsEqual<null, T>) => {},
//   undefined: <T>(value: IsEqual<undefined, T>) => {},
//   string: <T>(value: IsEqual<string, T>) => {},
//   number: <T>(value: IsEqual<number, T>) => {},
// }

// export const takes = {
//   string(v: string) {},
//   number(v: number) {},
//   unknown(v: unknown) {},
// }

// export function it(description: string, fn: () => void) {}
// export function describe(description: string, fn: () => void) {}

/**
 * Takes an array of keys that should be defined as `readonly` by using
 * `as const` like this:
 *
 * const keys = ['a', 'b', 'c'] as const
 *
 * And returns a typed object which is limited to the keys.
 */
// export function mapKeysToObject<A extends readonly T[], T extends string, R>(
//   array: A,
//   iteratee: (item: T) => R
// ): { [key in A[number]]: R } {
//   const object: { [key: string]: R } = {}
//   array.forEach((key) => {
//     const value = iteratee(key)
//     object[key] = value
//   })
//   return object as { [key in A[number]]: R }
// }

/**
 * Fixes the loose type checking in TypeScript where returning an indexed
 * item in an array returns the type even though it may also be undefined.
 *
 * This function makes it return the type | undefined
 */
export function arrayHead<T>(ts: T[]): T | undefined {
  return ts[0]
}

export function first<T>(ts: T[]): T | undefined {
  return ts[0]
}

export function one<T>(ts: T[]): T {
  const first = ts[0]
  if (first == null)
    throw new Error(`one must always return a record but does not`)
  return first
}

/**
 * Takes an array of some item and returns the item type
 */
export type InferItem<T extends any[]> = T extends Array<infer I> ? I : never

/**
 * Take one type and narrows (constrains it) by another.
 */
export type Narrow<T, N> = T extends N ? T : never

/**
 * TODO: Not Tested
 *
 * Grabs all of the Element props related to the Generic Element
 */
export type ElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>
