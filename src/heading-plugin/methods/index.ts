import { Editor } from "slate"

import { curry } from "~/src/sink"

import { HeadingElement } from "../types"

function convertHeading(
  editor: Editor,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  allowToggle: boolean
) {
  editor.toggleElement.convertElements<HeadingElement>(
    (element) => element.type === "heading" && element.level == level,
    { type: "heading", level },
    allowToggle
  )
}

export function createHeadingMethods(editor: Editor) {
  return {
    convertHeading: curry(convertHeading, editor),
  }
}
