import { Editor, Element, Transforms } from "slate"

import { findElementUp } from "~/src/sink"

import { BuiltInLanguage } from "../types"

/**
 * Set the current CodeBlock's language if the selection is currently in a
 * CodeBlock. Returns true if the language was set, false otherwise.
 */
export function setCodeBlockLanguage(
  editor: Editor,
  language: BuiltInLanguage
): boolean {
  const entry = findElementUp(
    editor,
    (el) => Element.isElement(el) && el.type === "code-block"
  )
  if (!entry) return false
  Transforms.setNodes(editor, { language }, { at: entry[1] })
  return true
}
