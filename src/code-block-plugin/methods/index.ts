import { Editor } from "slate"

import { curry } from "~/src/sink"

import { createCodeBlock } from "./create-code-block"

export function createCodeBlockMethods(editor: Editor) {
  return {
    createCodeBlock: curry(createCodeBlock, editor),
  }
}
