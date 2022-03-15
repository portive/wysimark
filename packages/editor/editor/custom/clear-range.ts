import { Editor, Path, Range, Text, Transforms } from "slate"
import { isPrimaryBlockElement } from "../types"

/**
 * Clear the current selection
 */
export function clearSelection(editor: Editor) {
  if (editor.selection == null) return
  clearRange(editor, editor.selection)
}

/**
 * "Clear" a range which is different than deleting one. When we clear a range,
 * we preserve the shape of the objects. For example, if we clear some cells in
 * a table, the table cells will exist but the content will be removed.
 */
export function clearRange(editor: Editor, range: Range) {
  const primaryEntries = [
    ...Editor.nodes(editor, {
      at: range,
      match: isPrimaryBlockElement,
      reverse: true,
    }),
  ]

  const startPoint = Range.start(range)
  const endPoint = Range.end(range)
  const startPrimaryPath = primaryEntries[primaryEntries.length - 1][1]
  const endPrimaryPath = primaryEntries[0][1]
  if (Path.equals(startPrimaryPath, endPrimaryPath)) {
    clearTextInRange(editor, range)
  } else {
    /**
     * start and end are in different nodes
     */
    for (const [, primaryPath] of primaryEntries) {
      if (Path.equals(primaryPath, startPrimaryPath)) {
        clearTextInRange(editor, {
          anchor: startPoint,
          focus: Editor.end(editor, primaryPath),
        })
        Transforms.select(editor, startPoint)
      } else if (Path.equals(primaryPath, endPrimaryPath)) {
        clearTextInRange(editor, {
          anchor: Editor.start(editor, primaryPath),
          focus: endPoint,
        })
        Transforms.select(editor, Editor.start(editor, primaryPath))
      } else {
        Transforms.delete(editor, { at: primaryPath })
      }
    }
  }
}

function clearTextInRange(editor: Editor, range: Range) {
  const textNodeEntries = Editor.nodes(editor, {
    at: range,
    match: Text.isText,
  })
  const startPoint = Range.start(range)
  const endPoint = Range.end(range)
  const startPath = startPoint.path
  const endPath = endPoint.path
  if (Path.equals(startPath, endPath)) {
    /**
     * start and end are in the same text node
     */
    Transforms.delete(editor, { at: range })
  } else {
    /**
     * start and end are in different nodes
     */
    for (const [, textPath] of textNodeEntries) {
      if (Path.equals(textPath, startPath)) {
        Transforms.delete(editor, {
          at: { anchor: startPoint, focus: Editor.end(editor, textPath) },
        })
      } else if (Path.equals(textPath, endPath)) {
        Transforms.delete(editor, {
          at: { anchor: Editor.start(editor, textPath), focus: endPoint },
        })
      } else {
        Transforms.delete(editor, { at: Editor.range(editor, textPath) })
      }
    }
    Transforms.select(editor, startPoint)
  }
}
