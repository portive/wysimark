import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { insertLink } from "./insert-link"

export function createAnchorMethods(editor: Editor) {
  return {
    insertLink: curryOne(insertLink, editor),
  }
}
