import { Editor, Element, NodeEntry, Path } from "slate"

import { findElementUp } from "~/src/sink"

export function isSafeDelete(
  editor: Editor,
  a: NodeEntry | undefined,
  b: NodeEntry | undefined
) {
  if (!a || !b) return true
  /**
   * If the current Node and the next Node are the same, short circuit
   * and leave early. Good for performance.
   */
  if (Path.equals(a[1], b[1])) return true
  const masterEntryA = findElementUp(
    editor,
    (el) => Element.isElement(el) && editor.isMaster(el),
    { at: a[1] }
  )
  const masterEntryB = findElementUp(
    editor,
    (el) => {
      return Element.isElement(el) && editor.isMaster(el)
    },
    { at: b[1] }
  )
  /**
   * If neither have a master, then don't worry about it.
   */
  if (!masterEntryA && !masterEntryB) return true
  /**
   * If they both have a master but it's the same master, then don't
   * worry about it.
   */
  if (
    masterEntryA &&
    masterEntryB &&
    Path.equals(masterEntryA[1], masterEntryB[1])
  )
    return true
  return false
}
