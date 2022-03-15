import { Editor, Element, Node, NodeEntry } from "slate"
import { isElementByType } from "../../types"
import { Narrow } from "../../utils"

/**
 * Gets all node entries that are selected and match as an array of nodes.
 *
 * If you pass in a type `T`, the `NodeEntry` returned is of that type.
 */
export function getNodeEntries<T extends Node>(
  editor: Editor,
  match: (node: Node) => boolean
): NodeEntry<T>[] {
  return Array.from(Editor.nodes<T>(editor, { match }))
}

/**
 * Returns an array of elements that match the given `type` using the current
 * selection range.
 *
 * The returned elements have a narrowed type using `type` as the discriminant.
 */
export function getElementsByType<T extends Element["type"]>(
  editor: Editor,
  type: T
): NodeEntry<Narrow<Element, { type: T }>>[] {
  return getNodeEntries<Narrow<Element, { type: T }>>(editor, (node) =>
    isElementByType(node, type)
  )
}

const TOTAL_EDITOR_CONTAINER_PADDING = 32

/**
 * Get the inner width of the editor (i.e. the area with the content in it).
 *
 * We use this for setting the maximum width of an uploaded image.
 */
export function getEditorInnerWidth(editor: Editor) {
  const container = editor.containerRef.current
  if (container == null) {
    throw new Error(`Could not find the container div for the editor`)
  }
  const rect = container.getBoundingClientRect()
  return rect.width - TOTAL_EDITOR_CONTAINER_PADDING
}
