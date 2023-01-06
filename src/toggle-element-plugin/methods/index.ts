import { Editor } from "slate"

import { curry } from "~/src/sink"

import { addToggleElementType } from "./add-toggle-element-type"
import { isToggleElement } from "./is-toggle-element"
import { CurriedSetElements, setElements } from "./set-elements"
import { CurriedToggleElements, toggleElements } from "./toggle-elements"

export function createToggleElementMethods(editor: Editor) {
  return {
    toggleElementTypes: [] as string[],
    addToggleElementType: curry(addToggleElementType, editor),
    isToggleElement: curry(isToggleElement, editor),
    setElements: curry(setElements, editor) as CurriedSetElements,
    toggleElements: curry(toggleElements, editor) as CurriedToggleElements,
  }
}
