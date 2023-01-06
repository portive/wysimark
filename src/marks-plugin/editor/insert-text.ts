import { Editor, Element, Point, Range, Text, Transforms } from "slate"

import { findElementUp, VoidActionReturn } from "~/src/sink"

export function insertText(editor: Editor, text: string): VoidActionReturn {
  return (
    autocompleteMark(editor, text, {
      triggerMarker: "`",
      regexp: /([`])([^`]+)([`])$/,
      mark: "code",
    }) ||
    autocompleteMark(editor, text, {
      triggerMarker: "*",
      regexp: /([*][*])([^*]+)([*][*])$/,
      mark: "bold",
    }) ||
    autocompleteMark(editor, text, {
      triggerMarker: "~",
      regexp: /(~~)([^~]+)(~~)$/,
      mark: "bold",
    }) ||
    autocompleteMark(editor, text, {
      triggerMarker: "*",
      regexp: /(?<!\*)([*])([^*]+)([*])$/,
      mark: "italic",
    }) ||
    autocompleteMark(editor, text, {
      triggerMarker: "~",
      regexp: /(?<!~)(~)([^~]+)(~)$/,
      mark: "italic",
    }) ||
    false
  )
}

/**
 * This utility function which is fairly specific to its usage in
 * `autocompleteMark` takes a Point and then two distances (second one is
 * optional), measured in `offset`, before the Point.
 *
 * It then returns a range before the `startDistance` and the `endDistance`.
 *
 * NOTE:
 *
 * We use the unit `offset` because our regexp returns its matches in offsets.
 *
 * There is likely a little danger here in that it may be possible (I'm not sure
 * as I haven't researched the internals of Unicode at this point) that a
 * trigger marker like a `*` or a `~` is part of an Emoji or other Unicode
 * character which does not display as a `*` or `~` and would get accidentally
 * matched.
 *
 * Counting unicode characters may be overkill as it appears to be quite
 * challenging at this point in time. See:
 *
 * https://coolaj86.com/articles/how-to-count-unicode-characters-in-javascript/
 */
function getRangeBackwards(
  editor: Editor,
  point: Point,
  startDistance: number,
  endDistance?: number
) {
  const startPoint = Editor.before(editor, point, {
    unit: "offset", // see notes in function description on why `offset`
    distance: startDistance,
  })
  const endPoint =
    endDistance === undefined
      ? point
      : Editor.before(editor, point, {
          unit: "offset", // see notes in function description on why `offset`
          distance: endDistance,
        })
  if (!startPoint)
    throw new Error(
      `startPoint not found. The distance backward from the point may be invalid.`
    )
  if (!endPoint)
    throw new Error(
      `endPoint not found. The distance backward from the point may be invalid.`
    )
  return {
    anchor: startPoint,
    focus: endPoint,
  }
}

/**
 * Takes a Point anywhere in the editor and returns the text text in the current
 * block before that Point in the editor.
 *
 * If the Point happens not to be in a Block or that Block is a Void block (i.e.
 * in which the `children` are not defactor text/inlines) then this function
 * returns `null`
 *
 * For clarity, we return `null` which is more explicit than `undefined`.
 */
function getTextBeforePointInBlock(
  editor: Editor,
  point: Point
): string | null {
  /**
   * Make sure we are in a block and that the block is not void.
   */
  const blockEntry = findElementUp(
    editor,
    (node) =>
      Element.isElement(node) &&
      !Editor.isVoid(editor, node) &&
      Editor.isBlock(editor, node)
  )
  if (blockEntry == null) return null
  const range = {
    anchor: Editor.start(editor, blockEntry[1]),
    focus: point,
  }
  return Editor.string(editor, range)
}

function autocompleteMark(
  editor: Editor,
  text: string,
  {
    triggerMarker,
    regexp,
    mark,
  }: { triggerMarker: string; regexp: RegExp; mark: keyof Text }
): VoidActionReturn {
  if (editor.selection === null) return false
  if (Range.isExpanded(editor.selection)) return false
  if (text !== triggerMarker) return false

  /**
   * Grab all the text from the beginning of the block until now
   */
  const beforeInsertText = getTextBeforePointInBlock(
    editor,
    editor.selection.focus
  )
  const beforeText = `${beforeInsertText}${text}`
  /**
   * See if the text matches our pattern
   */
  const match = beforeText.match(regexp)
  if (match == null) return false
  if (match.length !== 4)
    throw new Error(
      `Expected the RegExp to have 3 grouped subexpressions but returned ${
        match.length - 1
      }`
    )

  /**
   * This callback method we are returning gets executed after the text is
   * inserted by the original `insertText` method.
   */
  return () => {
    /**
     * We are in the future now (after the insert happened) so we are
     * revalidating that the selection is not null and that it is collapsed
     */
    if (editor.selection === null) return false
    if (Range.isExpanded(editor.selection)) return false

    /**
     * Delete the closing markers
     */
    const closingMarkersRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[3].length
    )
    Transforms.delete(editor, { at: closingMarkersRange })

    /**
     * Delete the opening markers
     */
    const openingMarkersRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[2].length + match[3].length,
      match[2].length
    )
    Transforms.delete(editor, { at: openingMarkersRange })

    /**
     * Create a range that represents the selected text
     */
    const matchRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      match[2].length
    )

    /**
     * Feels like `withoutMerging` should work but if we undo twice after this,
     * causes a crash.
     *
     * This looks like a good solution that isn't in main
     * https://github.com/ianstormtaylor/slate/issues/3874
     *
     * NOTE:
     *
     * Manually calling `editor.onChange()` won't work
     *
     * An appropriate starting point for searching more in issues
     * https://github.com/ianstormtaylor/slate/issues?q=is%3Aissue+withoutMerging+is%3Aclosed
     */
    editor.marksPlugin.toggleMark(mark, undefined, { at: matchRange })
    Editor.removeMark(editor, mark)
  }
}
