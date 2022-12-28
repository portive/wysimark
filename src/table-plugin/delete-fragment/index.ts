import { BasePoint, Editor, Path, Range, Transforms } from "slate"

import { findElementUpPath } from "~/src/sink"

const PROTECTED_ELEMENT_TYPES = ["table-cell"]

function getReversedDeleteSafeRanges(
  editor: Editor,
  deleteRange: Range
): Range[] {
  const positions = [...Editor.positions(editor, { at: deleteRange })]

  const ranges: Range[] = []

  let startPos: BasePoint, prevPos: BasePoint, startTdPath: Path | undefined
  startPos = prevPos = positions[0]
  startTdPath = findElementUpPath(editor, PROTECTED_ELEMENT_TYPES, {
    at: startPos,
  })

  for (const pos of positions) {
    const tdPath = findElementUpPath(editor, PROTECTED_ELEMENT_TYPES, {
      at: pos,
    })
    if (
      (startTdPath && tdPath && Path.equals(startTdPath, tdPath)) ||
      (startTdPath == undefined && tdPath == undefined)
    ) {
      prevPos = pos
    } else {
      const range = { anchor: startPos, focus: prevPos }
      ranges.push(range)
      startPos = prevPos = pos
      startTdPath = tdPath
    }
  }
  const range = { anchor: startPos, focus: prevPos }
  ranges.push(range)
  ranges.reverse()
  return ranges
}

export function deleteFragment(editor: Editor) {
  if (editor.selection == null) return false
  const [start, end] = Editor.edges(editor, editor.selection)
  const startTdPath = findElementUpPath(editor, PROTECTED_ELEMENT_TYPES, {
    at: start,
  })
  const endTdPath = findElementUpPath(editor, PROTECTED_ELEMENT_TYPES, {
    at: end,
  })
  /**
   * If the start or the end of the selection isn't in a table cell,
   * then the default handler works fine so return `false`
   */
  if (!startTdPath && !endTdPath) return false
  /**
   * If the start and end are in the same TD, then the default handler
   * works fine so return `false`
   */
  if (startTdPath && endTdPath && Path.equals(startTdPath, endTdPath))
    return false

  const ranges = getReversedDeleteSafeRanges(editor, editor.selection)

  Editor.withoutNormalizing(editor, () => {
    for (const range of ranges) {
      Transforms.delete(editor, { at: range })
    }
    Transforms.collapse(editor, { edge: "start" })
  })

  return true
}
