import { createPlugin, TypedPlugin } from "~/src/sink"

import { createSwitchElementMethods } from "./methods"

/**
 * This is a helper plugin that helps us to:
 *
 * - Identify block elements that can be converted into other types of simple
 *   block elements.
 * - Convert those elements into other types of simple block elements.
 *
 * Here are examples of convertible elements
 *
 * - heading elements
 * - paragraph elements
 * - list elements
 */

export type SwitchElementEditor = {
  switchElement: ReturnType<typeof createSwitchElementMethods>
}

export type SwitchElementPluginCustomTypes = {
  Name: "switch-element"
  Editor: SwitchElementEditor
}

export const SwitchElementPlugin = createPlugin<SwitchElementPluginCustomTypes>(
  (editor) => {
    editor.switchElement = createSwitchElementMethods(editor)
    return {
      name: "switch-element",
    }
  }
) as TypedPlugin<SwitchElementPluginCustomTypes>
