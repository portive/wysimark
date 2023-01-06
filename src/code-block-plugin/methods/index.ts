import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { createCodeBlock } from "./create-code-block"

export function createCodeBlockMethods(editor: Editor) {
  return {
    createCodeBlock: curryOne(createCodeBlock, editor),
  }
}
