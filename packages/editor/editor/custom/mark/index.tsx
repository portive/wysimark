import { Editor } from "slate"
import { MARK_KEYS, MarkProps } from "../../types"

/**
 * Returns true if the passed in `mark` key is active at the moment.
 *
 * Optionally, you can pass in a `markValue` but if it's not passed in, it
 * is assume to be true so we can check for most marks like `bold` like this:
 *
 * `Custom.isMarkActive(editor, 'bold')`
 */
function isMarkActive(
  editor: Editor,
  mark: keyof MarkProps,
  markValue: MarkProps[keyof MarkProps] = true
) {
  const marks = Editor.marks(editor)
  return marks ? marks[mark] === markValue : false
}

/**
 * If mark doesn't exist, add it with the value set to `markValue`.
 * This properly handles that `pos` can only be `sup` or `sub` but not
 * both at the same time.
 */
export function toggleMark<MarkKey extends keyof MarkProps>(
  editor: Editor,
  mark: MarkKey,
  markValue: MarkProps[MarkKey] = true
) {
  const isActive = isMarkActive(editor, mark, markValue)
  if (isActive) {
    Editor.removeMark(editor, mark)
  } else {
    Editor.addMark(editor, mark, markValue)
  }
}

/**
 * remove all marks
 */
export function removeAllMarks(editor: Editor) {
  MARK_KEYS.forEach((mark) => {
    Editor.removeMark(editor, mark)
  })
}
