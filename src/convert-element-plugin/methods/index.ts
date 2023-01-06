import { Editor } from "slate"

import { curry } from "~/src/sink"

import { addConvertElementType } from "./add-convert-element-type"
import { convertElements, CurriedConvertElements } from "./convert-elements"
import { isConvertElement } from "./is-convert-element"

export function createConvertElementMethods(editor: Editor) {
  return {
    convertElementTypes: [] as string[],
    addConvertElementType: curry(addConvertElementType, editor),
    isConvertibleElement: curry(isConvertElement, editor),
    convertElements: curry(convertElements, editor) as CurriedConvertElements,
  }
}
