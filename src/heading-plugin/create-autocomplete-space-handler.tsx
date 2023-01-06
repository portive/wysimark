import { isHotkey } from "is-hotkey"
import { Editor, Element as SlateElement, Range, Transforms } from "slate"

import { findElementUp, stopEvent } from "~/src/sink"

export const isSpace = isHotkey(" ")
export const isShiftSpace = isHotkey("SHIFT+SPACE")

export function createAutocompleteSpaceHandler(
  editor: Editor,
  methods: Record<string, undefined | (() => void)>
) {
  return (e: React.SyntheticEvent<Element, KeyboardEvent>): boolean => {
    /**
     * We support `shift+space` as well because when we are typing something
     * like `## ` sometimes the finger hasn't left the shift key yet. In normal
     * usage, we still get a space and so the feature feels intermittently
     * broken if we don't support `shift+space`.
     */
    if (!isSpace(e.nativeEvent) && !isShiftSpace(e.nativeEvent)) return false

    /**
     * Make sure theere is a selection and it's collapsed
     */
    const { selection } = editor
    if (selection === null) return false
    if (Range.isExpanded(selection)) return false

    /**
     * Find a convertible block and if we can't find one, exit.
     */
    const convertibleBlockEntry = findElementUp(
      editor,
      (node) =>
        /**
         * NOTE: We alias to SlateElement because this page needs acces to both
         * the global Eleent and the Slate Element.
         */
        SlateElement.isElement(node) &&
        editor.toggleElement.isToggleElement(node)
    )
    if (!convertibleBlockEntry) return false

    /**
     * Find a matching method. Note that the keys in `methods` are the `string`
     * prefixes we are looking for like `##` for heading level 2.
     *
     * If no match, exit.
     */
    const range = {
      anchor: Editor.start(editor, convertibleBlockEntry[1]),
      focus: selection.focus,
    }
    const text = Editor.string(editor, range)
    const method = methods[text]
    if (!method) return false

    /**
     * We have a match. Stop other event handlers.
     */
    stopEvent(e)

    /**
     * Delete the autocomplete text that came before the space bar was pressed.
     */
    const deleteRange = {
      anchor: Editor.start(editor, convertibleBlockEntry[1]),
      focus: selection.focus,
    }
    Transforms.delete(editor, { at: deleteRange })

    /**
     * Execute the matching method.
     */
    method()
    return true
  }
}
