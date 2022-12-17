import { Editor, Element, Location, Path, Transforms } from "slate"

import { findElementUp } from "~/src/sink"

/**
 * Inserts an Element into the document such that if it is in a `isMaster`
 * element (i.e. an Element that has a number of dependants like a table or
 * code block) then then inserted Element will appear after the `isMaster`
 * element.
 *
 * This prevents invalid states from happening like inserting a table inside
 * a table, or a code block in a table, or a table in a code block.
 */
export function insertRootElement(
  editor: Editor,
  element: Element,
  { at = editor.selection }: { at?: Location | null } = {}
): boolean {
  /**
   * If there's no `at` then insertion does not happen
   */
  if (at == null) return false
  /**
   * Look for a parent that `isMaster`
   */
  const entry = findElementUp(
    editor,
    (node) => Element.isElement(node) && editor.isMaster(node)
  )
  if (entry == null) {
    /**
     * If not `isMaster` then do a regular insert, select the original
     * insertion point and move forward to select the first position inside
     * the newly inserted element.
     */
    const selection = editor.selection
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, element, { at })
      if (selection) {
        Transforms.select(editor, selection)
        Transforms.move(editor)
      }
    })
  } else {
    /**
     * If it `isMaster` then find the next adjacent path to the master, insert
     * there, and then select at the start of the insertion point.
     */
    const nextPath = Path.next(entry[1])
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, element, { at: nextPath })
      Transforms.select(editor, Editor.start(editor, nextPath))
    })
  }
  return true
}
