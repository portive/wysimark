import isHotkey from "is-hotkey"
import { Editor, Node, Range } from "slate"
import { insertParagraphAt } from "~/editor/custom"
import { isSeamlessElement } from "../types"

const isUp = isHotkey("up")

/**
 * If our cursor is located at the top of the document inside a seamless
 * element, pressing the `up` key probably indicates a desire to find space
 * above the seamless element to type in.
 *
 * This code creates a paragraph in this situation.
 *
 * There may be other scenarios where the user desires to put in an empty
 * paragraph, perhaps at the top of a blockquote; however, in these other areas
 * the intention is ambiguous. For example, is it meant to access the inside
 * of the blockquote or just outside it?
 *
 * The top of the document is not ambiguous and also, since a title usually
 * goes up there, or we may want to add content to the top of the document,
 * this seems a common enough desire to warrant a special case.
 */
export function handleKeyDownUp(
  event: React.KeyboardEvent,
  editor: Editor
): boolean {
  if (!isUp(event.nativeEvent)) return false
  const { selection } = editor
  if (selection == null) return false
  if (Range.isExpanded(selection)) return false
  const isStart = Editor.isStart(editor, selection.anchor, [0])
  if (!isStart) return false
  if (!isSeamlessElement(Node.get(editor, [0]))) return false
  insertParagraphAt(editor, [0])
  return true
}
