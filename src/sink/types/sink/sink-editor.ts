import { Element } from "slate"

import { BasePluginCustomTypes, PluginObject } from ".."

/**
 * SinkEditor just adds a `sink` object where we drop all of our sink
 * related data on.
 */
export type SinkEditor<
  T extends BasePluginCustomTypes = BasePluginCustomTypes
> = {
  /**
   * a master Element is one that has one or more elements that are depedant
   * on it. For example, a `table` Element. For clarity, a `table-row` Element
   * is not considered a master Element. Only the top-most element is.
   *
   * One use for identify a master is for adding a block quote. We want the
   * block quote to always surround the master Element. A block-quote that
   * surrounded a table-row, for example, would not make sense.
   */
  isMaster: (node: Element) => boolean
  /**
   * An Element that is able to be toggled with a Paragraph or easily converted
   * to another type like a list item to a heading.
   *
   * Some examples are:
   *
   * - list item
   * - heading
   *
   * The characteristics of such an Element are:
   *
   * - It contains a single Element with no dependant elements
   * - It has children that are Text or Inline elements only
   * - Generally doesn't carry too many properties which make it more natural
   *   to convert to another type.
   */
  isConvertible: (node: Element) => boolean
  /**
   * a slave Element is one that is dependant on another Element. For example,
   * `table-row`, `table-cell` and `table-cotent` elements are all considered
   * slave elements.
   *
   * At the time of writing, I haven't figured out a use case for a slave
   * element actually...
   */
  isSlave: (node: Element) => boolean
  isStandalone: (node: Element) => boolean
  sink: {
    plugins: PluginObject<T>[]
    pluginsFor: {
      decorate: PluginObject<T>[]
      onKeyDown: PluginObject<T>[]
      onKeyPress: PluginObject<T>[]
      onKeyUp: PluginObject<T>[]
      renderEditable: PluginObject<T>[]
      renderElement: PluginObject<T>[]
      renderLeaf: PluginObject<T>[]
    }
  }
}
