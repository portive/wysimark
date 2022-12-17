import { BaseElement, BaseText } from "slate"

/**
 * When creating a single PluginCustomType, we want to constrain it as much as
 * possible. These are the constraints.
 */
export type BasePluginCustomTypes = {
  Name: string
  Editor: Record<string, unknown>
  Element: BaseElement
  Text: BaseText
}

/**
 * When we are accepting an array of plugins, unfortunately we can't be as
 * restrictive as TypeScript throws an error saying that the second plugin is
 * incompatible with the first. So we have a less type safe version with any
 * for that use case.
 *
 * WEIRD:
 *
 * If I make any of these property keys optional, for example to suggest that
 * you don't need to provide a property for every entry in the array, this
 * shows a type mismatch when used in an array. It shows a type mismatch even
 * if the items in the array are all provided or if the array has only one
 * item that matches.
 */
export type ArraySafePluginCustomTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Name: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Editor: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Element: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Text: any
}

/**
 * This is how we define the PluginCustomTypes.
 */
export type PluginCustomTypes<T extends BasePluginCustomTypes> = T
