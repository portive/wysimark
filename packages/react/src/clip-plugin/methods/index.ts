import { Editor } from "slate"

import { curryOne } from "~/src/sink"

function noop(editor: Editor) {
  editor
}

export function createClipMethods(editor: Editor) {
  return {
    noop: curryOne(noop, editor),
  }
}
