/**
 * The first step is we need to define a plugin. A plugin includes a number of
 * CustomTypes which is how we define the plugin.
 */

import { BaseEditor, BaseElement, BaseText } from "slate"

export type BaseCustomTypes = {
  Editor: BaseEditor
  Element: BaseElement
  Text: BaseText
}

/**
 * The definition of a Sink Plugin is simply the CustomTypes for that
 * particular plugin.
 *
 * Any undefined types will, in the Sink Plugin, be treated as a Base version
 * of the type; however, the type definition will not show this.
 */
export type SinkPlugin<T extends Partial<BaseCustomTypes>> = T

/**
 * This method takes a sink plugin type as its generic and then returns the
 * CustomTypes values. Mainly, if a type doesn't exist on the SinkPlugin
 * type, then it reverts to the Base version of the type.
 */
export type NormalizeSinkPlugin<T extends Partial<BaseCustomTypes>> = {
  /**
   * Iterate through all the properties of BaseCustomTypes and if any of them
   * exist on T (the plugin definition) then we use the plugin definition.
   * If it does not exist, we default back to the Base version of the type.
   */
  [K in keyof BaseCustomTypes]: K extends keyof T ? T[K] : BaseCustomTypes[K]
}

/**
 * EXAMPLE
 * =======
 */
