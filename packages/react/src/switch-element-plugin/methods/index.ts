import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { addSwitchElementType } from "./add-switch-element-type"
import { isSwitchElement } from "./is-switch-element"
import { CurriedSwitchElements, switchElements } from "./switch-elements"

export function createSwitchElementMethods(editor: Editor) {
  return {
    switchElementTypes: [] as string[],
    addSwitchElementType: curryOne(addSwitchElementType, editor),
    isSwitchElement: curryOne(isSwitchElement, editor),
    switchElements: curryOne(switchElements, editor) as CurriedSwitchElements,
  }
}
