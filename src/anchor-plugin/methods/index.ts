import { Editor } from "slate"

import { curry } from "~/src/sink"

import { insertLink } from "./insert-link"

export function createAnchorMethods(editor: Editor) {
  return {
    insertLink: curry(insertLink, editor),
  }
}
