import { Editor, Range, Text, Transforms } from "slate"

import { VoidActionReturn } from "~/src/sink"

import { getRangeBackwards } from "./get-range-backwards"
import { getTextBeforePointInBlock } from "./get-text-before-point-in-block"

export function autocompleteMark(
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
      /**
       * TODO:
       *
       * We should be using Slate's internal `getCharacterDistance` to generate
       * a length but it is not exposed.
       **/
      match[3].length
    )
    Transforms.delete(editor, { at: closingMarkersRange })

    /**
     * Delete the opening markers
     */
    const openingMarkersRange = getRangeBackwards(
      editor,
      editor.selection.focus,
      /**
       * TODO:
       *
       * We should be using Slate's internal `getCharacterDistance` to generate
       * a length but it is not exposed.
       **/
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
      /**
       * TODO:
       *
       * We should be using Slate's internal `getCharacterDistance` to generate
       * a length but it is not exposed.
       **/
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

    /**
     * Turn off the mark afterewards so that when we close with a marker like
     * `**` that the bold mark is turned off.
     */
    Editor.removeMark(editor, mark)
  }
}
