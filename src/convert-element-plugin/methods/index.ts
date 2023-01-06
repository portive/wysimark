import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { addConvertElementType } from "./add-convert-element-type"
import { convertElements, CurriedConvertElements } from "./convert-elements"
import { isConvertElement } from "./is-convert-element"

export function createConvertElementMethods(editor: Editor) {
  return {
    convertElementTypes: [] as string[],
    addConvertElementType: curryOne(addConvertElementType, editor),
    isConvertibleElement: curryOne(isConvertElement, editor),
    convertElements: curryOne(
      convertElements,
      editor
    ) as CurriedConvertElements,
  }
}
