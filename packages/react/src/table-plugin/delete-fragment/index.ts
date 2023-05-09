import { Editor, Path, Transforms } from "slate"

import { findElementUpPath } from "~/src/sink"

import { getReversedDeleteSafeRanges } from "./get-reversed-delete-safe-ranges"

/**
 * This is a special version of deleteFragment that respects elements of the
 * given `protectedTypes` so that they aren't deleted whole and only their
 * children are deleted.
 *
 * This is used in cases like a `table-cell` where we want to protect the
 * shape of the `table`.
 *
 * If the start or end of the deletion range isn't in a protectedType, we don't
 * need to anything special so we let the default delete handle it.
 *
 * If the start or end of the deletion range is in a protectedType but it is
 * the same Element, then the default handler works fine too.
 *
 * In other cases, we break down the full deletion range into multiple ranges.
 * Each range won't go across a protectedType. In effect, this means that we
 * only delete the content of protectedTypes and we do the regular deletes
 * across everything else.
 */
export function deleteFragmentWithProtectedTypes(
  editor: Editor,
  protectedTypes: string[]
) {
  if (editor.selection == null) return false
  const [start, end] = Editor.edges(editor, editor.selection)
  const startProtectedPath = findElementUpPath(editor, protectedTypes, {
    at: start,
  })
  const endProtectedPath = findElementUpPath(editor, protectedTypes, {
    at: end,
  })
  /**
   * If the start or the end of the selection isn't in a protectedType element
   * then just do a normal delete so we return `false`.
   */
  if (!startProtectedPath && !endProtectedPath) {
    return false
  }

  /**
   * If the start and end are in the same protectedType element, then the
   * default handler works fine so return `false`
   */
  if (
    startProtectedPath &&
    endProtectedPath &&
    Path.equals(startProtectedPath, endProtectedPath)
  ) {
    return false
  }

  /**
   * Breaks the range to delete into chunks of ranges that are safe to delete.
   * We do this by not allowing a deletion across one of the `protectedTypes`
   */
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
