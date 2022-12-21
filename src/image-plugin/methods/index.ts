import { Editor } from "slate"

import { curry } from "~/src/sink"

function noop(editor: Editor) {
  editor
}

export function createImageMethods(editor: Editor) {
  return {
    noop: curry(noop, editor),
  }
}
