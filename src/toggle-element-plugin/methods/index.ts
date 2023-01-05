import { Editor } from "slate"

import { curry } from "~/src/sink"

import { addToggleElementType } from "./add-toggle-element-type"
import { isToggleElement } from "./is-toggle-element"
import { CurriedToggleElements, toggleElements } from "./toggle-elements"

export function createToggleElementMethods(editor: Editor) {
  return {
    toggleElementTypes: [] as string[],
    addToggleElementType: curry(addToggleElementType, editor),
    isToggleElement: curry(isToggleElement, editor),
    toggleElements: curry(toggleElements, editor) as CurriedToggleElements,
  }
}
