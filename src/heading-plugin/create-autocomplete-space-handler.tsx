import { isHotkey } from "is-hotkey"
import { Editor, Element as SlateElement, Range, Transforms } from "slate"

import { findElementUp, stopEvent } from "~/src/sink"

export const isSpace = isHotkey(" ")

export function createAutocompleteSpaceHandler(
  editor: Editor,
  toggleMethods: Record<string, undefined | (() => void)>
) {
  return (e: React.SyntheticEvent<Element, KeyboardEvent>): boolean => {
    if (isSpace(e.nativeEvent)) {
      const { selection } = editor
      if (selection === null) return false
      if (Range.isExpanded(selection)) return false
      const convertibleBlockEntry = findElementUp(
        editor,
        (node) =>
          SlateElement.isElement(node) &&
          editor.toggleElement.isToggleElement(node)
      )
      if (!convertibleBlockEntry) return false
      const range = {
        anchor: Editor.start(editor, convertibleBlockEntry[1]),
        focus: selection.focus,
      }
      const text = Editor.string(editor, range)
      const toggleMethod = toggleMethods[text]
      if (!toggleMethod) return false
      stopEvent(e)
      const deleteRange = {
        anchor: Editor.start(editor, convertibleBlockEntry[1]),
        focus: selection.focus,
      }
      Transforms.delete(editor, { at: deleteRange })
      toggleMethod()
      return true
    }
    return false
  }
}
