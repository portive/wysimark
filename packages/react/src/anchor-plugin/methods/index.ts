import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { insertLink } from "./insertLink"
import { removeLink } from "./removeLink"

export function createAnchorMethods(editor: Editor) {
  return {
    insertLink: curryOne(insertLink, editor),
    removeLink: curryOne(removeLink, editor),
  }
}
