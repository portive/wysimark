import { BaseEditor, Element } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"

import { BasePluginPolicy } from ".."

/**
 * SinkEditor just adds a `sink` object where we drop all of our sink
 * related data on.
 */
export type SinkEditor = {
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
    plugins: BasePluginPolicy[]
  }
}

export type FullSinkEditor = SinkEditor &
  BaseEditor &
  ReactEditor &
  HistoryEditor
