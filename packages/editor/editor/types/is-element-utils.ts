import { Element, Node } from "slate"

/**
 * Returns true if type T and U are the same
 */

export type IsEqual<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false

/**
 * ## Disclaimer
 *
 * This code is hard to understand.
 *
 * ## Overview
 *
 * This method creates a method that is an element type checker. You pass the
 * created method an `Element` and then:
 *
 * - It returns `true` if the passed in `Element` is of the specified type.
 * - It defines a "type guard" so that we can use the method to narrow the type.
 *
 * ## USAGE
 *
 * To use this code, you must call it once with a generic that represents the
 * valid elements but no arguments on the function then immediately call it
 * again with two arguments: (1) an array of Element types that exactly matches
 * the types in the generic (2) `true`.
 *
 * The second argument is used to check that the passed in array of element
 * types matches. If not, TypeScript will expect to see the second argument
 * as `false` which is something we don't want.
 *
 * This is written so that we don't accidentally over specify or under specify
 * the items in the list, especially as we may change the definitions of some
 * of the types. This will reduce errors.
 */

export function IsElementType<T extends Element>() {
  /**
   * After the first call, we have specified `T` which extends `Element`.
   * This is the type that we want to check against. We specify it in the
   * method above because in this method below, we want to infer the type.
   *
   * TypeScript does not allow inferring some generics and specifying others.
   * See this issue: https://github.com/microsoft/TypeScript/issues/26242
   *
   * We infer the type as `UType` below and then we check it against the
   * specified type above. We also take another argument which should always
   * be passed in as `true`.
   *
   * We run an `IsEqual` generic as the type for `test` which will return
   * `true` if the specified Generic type above and the inferred one passed
   * in as the first argument match exactly (ie. not under or over specified).
   */
  return function createCheckWithTypeList<UType extends Element["type"]>(
    list: Array<UType>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _test: IsEqual<T["type"], UType> // IMPORTANT: required for type checking
  ) {
    /**
     * This is the method that does the actual check. It also creates a type
     * guard that matches the type `T` passed in as the original generic.
     */
    return function check(node: Node): node is T {
      return Element.isElement(node) && list.includes(node.type as any)
    }
  }
}

/**
 * Shortcut to create a list of element types
 */
export function elementTypes<TT extends Element["type"]>(list: TT[]) {
  return list
}

export function defineElementType<T extends Element>() {
  /**
   * After the first call, we have specified `T` which extends `Element`.
   * This is the type that we want to check against. We specify it in the
   * method above because in this method below, we want to infer the type.
   *
   * TypeScript does not allow inferring some generics and specifying others.
   * See this issue: https://github.com/microsoft/TypeScript/issues/26242
   *
   * We infer the type as `UType` below and then we check it against the
   * specified type above. We also take another argument which should always
   * be passed in as `true`.
   *
   * We run an `IsEqual` generic as the type for `test` which will return
   * `true` if the specified Generic type above and the inferred one passed
   * in as the first argument match exactly (ie. not under or over specified).
   */
  return function createCheckWithTypeList<UType extends Element["type"]>(
    list: Array<UType>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _test: IsEqual<T["type"], UType> // IMPORTANT: required for type checking
  ) {
    /**
     * This is the method that does the actual check. It also creates a type
     * guard that matches the type `T` passed in as the original generic.
     */
    return [
      list,
      function check(node: Node): node is T {
        return Element.isElement(node) && list.includes(node.type as any)
      },
    ] as const
  }
}
