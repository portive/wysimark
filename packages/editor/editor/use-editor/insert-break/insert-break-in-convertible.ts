import { Editor, Point, Transforms } from "slate"
import { ConvertibleBlockElement, isConvertibleBlockElement } from "../../types"

export function insertBreakInConvertible(
  editor: Editor,
  originalInsertBreak: () => void,
  cursor: Point
): boolean {
  /**
   * Look for convertible
   */
  const convertibleEntry = Editor.above<ConvertibleBlockElement>(editor, {
    match: isConvertibleBlockElement,
  })

  /**
   * If we're not in a convertible, exit early
   */
  if (convertibleEntry == null) return false

  const [convertibleNode, convertiblePath] = convertibleEntry

  /**
   * We need to find out if we are at the end before calling `insertBreak`
   */
  const isEnd = Editor.isEnd(editor, cursor, convertiblePath)

  originalInsertBreak()

  /**
   * If we were at the end of the convertible, convert it to a paragraph
   */
  if (isEnd && convertibleNode.type !== "p") {
    Transforms.setNodes(editor, { type: "p" })
  }

  return true
}
