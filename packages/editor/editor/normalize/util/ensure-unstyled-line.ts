import { Editor, Element, Node, Path, Text, Transforms } from "slate"

/**
 * Ensure all the children of a line contain only unstyled `Text`
 *
 * - Remove marks
 * - Remove links
 */
export function ensureUnstyledLine(
  editor: Editor,
  element: Element,
  path: Path
): boolean {
  let normalized = false
  for (const [childNode, childPath] of Node.children(editor, path, {
    reverse: true,
  })) {
    if (Text.isText(childNode) && Object.keys(childNode).length === 1) continue
    /**
     * Simplified the code so that `inline` elements and text nodes with more
     * than one property (i.e. a mark) are handled the same.
     */
    Transforms.removeNodes(editor, { at: childPath })
    Transforms.insertNodes(
      editor,
      { text: Node.string(childNode) },
      { at: childPath }
    )
    normalized = true
  }
  return normalized
}
