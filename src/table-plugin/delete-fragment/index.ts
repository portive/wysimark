import { BasePoint, Editor, Path, Range, Transforms } from "slate"

import { findElementUpPath } from "~/src/sink"

const PROTECTED_ELEMENT_TYPES = ["table-cell"]

function getReversedDeleteSafeRanges(
  editor: Editor,
  deleteRange: Range,
  protectedTypes: string[]
): Range[] {
  const positions = [...Editor.positions(editor, { at: deleteRange })]

  const ranges: Range[] = []

  let startPos: BasePoint, prevPos: BasePoint, startTdPath: Path | undefined
  startPos = prevPos = positions[0]
  startTdPath = findElementUpPath(editor, protectedTypes, {
    at: startPos,
  })

  for (const pos of positions) {
    const tdPath = findElementUpPath(editor, protectedTypes, {
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

export function deleteFragment(editor: Editor, protectedTypes: string[]) {
  if (editor.selection == null) return false
  const [start, end] = Editor.edges(editor, editor.selection)
  const startProtectedPath = findElementUpPath(editor, protectedTypes, {
    at: start,
  })
  const endProtectedPath = findElementUpPath(editor, protectedTypes, {
    at: end,
  })
  /**
   * If the start or the end of the selection isn't in a table cell,
   * then the default handler works fine so return `false`
   */
  if (!startProtectedPath && !endProtectedPath) {
    return false
  }

  /**
   * If the start and end are in the same TD, then the default handler
   * works fine so return `false`
   */
  if (
    startProtectedPath &&
    endProtectedPath &&
    Path.equals(startProtectedPath, endProtectedPath)
  ) {
    return false
  }

  const reversedRanges = getReversedDeleteSafeRanges(
    editor,
    editor.selection,
    protectedTypes
  )

  /**
   * We iterate through the ranges backwards deleting each delete safe range.
   * At the end, we collapse the originally selected deletion range to the
   * front.
   *
   * NOTE:
   *
   * Ideally, we'd actually collapse this to the start or end depending on the
   * direction of the delete; however, that information is not presently
   * provided to us. Might be a small improvement in the future that requires
   * us to update Slate.
   */
  Editor.withoutNormalizing(editor, () => {
    for (const range of reversedRanges) {
      Transforms.delete(editor, { at: range })
    }
    Transforms.collapse(editor, { edge: "start" })
  })

  return true
}
