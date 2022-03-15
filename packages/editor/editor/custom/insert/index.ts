export * from "./insert-nested-block"
export * from "./insert-void-block"
export * from "./insert-paragraph-at"

import { Editor, Transforms } from "slate"
import { CodeLanguage } from "../../types"
import { insertNestedBlock } from "./insert-nested-block"
import { insertVoidBlock } from "./insert-void-block"

/**
 * Insert a code block
 */
export function insertCodeBlock(editor: Editor, language: CodeLanguage) {
  insertNestedBlock(editor, {
    type: "code-block",
    language,
    children: [{ type: "code-line", children: [{ text: "" }] }],
  })
}
/**
 * Insert a horizontal rule
 */
export function insertHorizontalRule(editor: Editor) {
  insertVoidBlock(editor, {
    type: "hr",
    children: [{ text: "" }],
  })
}
/**
 * Insert a link
 */
export function insertLink(editor: Editor, url: string, label: string) {
  Transforms.insertNodes(editor, {
    type: "link",
    url,
    children: [{ text: label }],
  })
}

export function insertLinkBlock(editor: Editor, url: string, label: string) {
  Transforms.insertNodes(editor, {
    type: "p",
    children: [
      { text: "" },
      {
        type: "link",
        url,
        children: [{ text: label }],
      },
      { text: "" },
    ],
  })
}
/**
 * Insert media block
 */
export function insertMedia(editor: Editor, url: string, alt: string = url) {
  insertVoidBlock(editor, {
    type: "media",
    url,
    alt,
    children: [{ text: "" }],
  })
}
/**
 * Insert newline (not a paragraph)
 */
export function insertNewline(editor: Editor) {
  editor.insertText("\n")
}
