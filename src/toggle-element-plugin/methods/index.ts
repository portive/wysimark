import { Editor } from "slate"

import { curry } from "~/src/sink"

import { addToggleElementType } from "./add-toggle-element-type"
import { convertElements, CurriedConvertElements } from "./convert-elements"
import { isToggleElement } from "./is-toggle-element"

export function createToggleElementMethods(editor: Editor) {
  return {
    toggleElementTypes: [] as string[],
    addToggleElementType: curry(addToggleElementType, editor),
    isToggleElement: curry(isToggleElement, editor),
    convertElements: curry(convertElements, editor) as CurriedConvertElements,
  }
}
