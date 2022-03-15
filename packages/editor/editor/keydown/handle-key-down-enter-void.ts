import isHotkey from "is-hotkey"
import { Editor, Path } from "slate"
import { stopEvent } from "~/lib/stop-event"
import { insertParagraphAt } from "../custom"
import { isVoidElement } from "../types"

const isEnter = isHotkey("enter")
const isShiftEnter = isHotkey("shift+enter")

export function handleKeyDownEnterVoid(
  event: React.KeyboardEvent,
  editor: Editor
) {
  const enter = isEnter(event.nativeEvent)
  const shiftEnter = isShiftEnter(event.nativeEvent)
  if (!enter && !shiftEnter) return false
  if (editor.selection == null) return false

  const aboveEntry = Editor.above(editor, {
    at: editor.selection.focus,
    match: (n) => {
      return isVoidElement(n)
    },
  })
  if (aboveEntry) {
    stopEvent(event)
    const [, path] = aboveEntry

    /**
     * If it's `shift+enter` then insert above. Otherwise insert below.
     */
    const nextPath = shiftEnter ? path : Path.next(path)

    insertParagraphAt(editor, nextPath)

    return true
  } else {
    return false
  }
}
