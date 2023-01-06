import { Editor } from "slate"

import { curry } from "~/src/sink"

import { HeadingElement } from "../types"

function setHeading(editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6) {
  editor.toggleElement.setElements<HeadingElement>({
    type: "heading",
    level,
  })
}

function toggleHeading(editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6) {
  editor.toggleElement.toggleElements<HeadingElement>(
    (element) => element.type === "heading" && element.level == level,
    { type: "heading", level }
  )
}

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
    // setHeading: curry(setHeading, editor),
    // toggleHeading: curry(toggleHeading, editor),
    convertHeading: curry(convertHeading, editor),
  }
}
