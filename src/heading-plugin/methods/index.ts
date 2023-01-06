import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { HeadingElement } from "../types"

function convertHeading(
  editor: Editor,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  allowToggle: boolean
) {
  editor.convertElement.convertElements<HeadingElement>(
    (element) => element.type === "heading" && element.level == level,
    { type: "heading", level },
    allowToggle
  )
}

export function createHeadingMethods(editor: Editor) {
  return {
    convertHeading: curryOne(convertHeading, editor),
  }
}
