import { Editor, Element } from "slate"

import { curry } from "~/src/sink"

import { CurriedToggleElements, toggleElements } from "./toggle-elements"

function addToggleElementType(
  editor: Editor,
  type: Element["type"] | Array<Element["type"]>
): void {
  if (Array.isArray(type)) {
    editor.toggleElement.toggleElementTypes.push(...type)
  } else {
    editor.toggleElement.toggleElementTypes.push(type)
  }
}

function isToggleElement(editor: Editor, element: Element): boolean {
  return editor.toggleElement.toggleElementTypes.includes(element.type)
}

export function createToggleElementMethods(editor: Editor) {
  return {
    toggleElementTypes: [] as string[],
    addToggleElementType: curry(addToggleElementType, editor),
    isToggleElement: curry(isToggleElement, editor),
    toggleElements: curry(toggleElements, editor) as CurriedToggleElements,
  }
}
