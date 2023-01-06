import { Editor } from "slate"

import { VoidActionReturn } from "~/src/sink"

import { autocompleteMark } from "./autocomplete-mark"

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
    })
  )
}
