import { Editor, Element } from "slate"

import { curry } from "~/src/sink"

import { CurriedToggleElements, toggleElements } from "./toggle-elements"

function addToggleType(
  editor: Editor,
  type: Element["type"] | Array<Element["type"]>
): void {
  if (Array.isArray(type)) {
    editor.toggle.toggleTypes.push(...type)
  } else {
    editor.toggle.toggleTypes.push(type)
  }
}

function isToggle(editor: Editor, element: Element): boolean {
  return editor.toggle.toggleTypes.includes(element.type)
}

export function createToggleMethods(editor: Editor) {
  return {
    toggleTypes: [] as string[],
    addToggleType: curry(addToggleType, editor),
    isToggle: curry(isToggle, editor),
    toggleElements: curry(toggleElements, editor) as CurriedToggleElements,
  }
}
