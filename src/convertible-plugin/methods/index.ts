import { Editor, Element } from "slate"

import { curry } from "~/src/sink"

function addConvertibleType(editor: Editor, type: Element["type"]): void {
  editor.convertible.convertibleTypes.push(type)
}

function isConvertible(editor: Editor, element: Element): boolean {
  return editor.convertible.convertibleTypes.includes(element.type)
}

export function createConvertibleMethods(editor: Editor) {
  return {
    convertibleTypes: [] as string[],
    addConvertibleType: curry(addConvertibleType, editor),
    isConvertible: curry(isConvertible, editor),
  }
}
