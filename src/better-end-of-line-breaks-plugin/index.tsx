import { BaseElement, BaseText } from "slate"

import { createPlugin } from "~/src/sink"

export type BetterEndOfLineBreaksEditor = {
  supportsBetterEndOfLineBreaks: true
}

export type BetterEndOfLineBreaksPluginCustomTypes = {
  Name: "better-end-of-line-breaks"
  Editor: BetterEndOfLineBreaksEditor
  Element: BaseElement
  Text: BaseText
}

export const InlineCodePlugin = () =>
  createPlugin<BetterEndOfLineBreaksPluginCustomTypes>((editor) => {
    editor.supportsBetterEndOfLineBreaks = true
    const originalInsertBreak = editor.insertBreak
    editor.insertBreak = () => {
      /**
       * TODO:
       * We want to check if we are at the end of line of a specific line
       * type and if we are, we want to map that to another type.
       *
       * By default, an enter always leaves us with the same element type.
       *
       * But if we are at the end of a heading, we want it to turn back into
       * a paragraph.
       *
       * If we are in a checked list item, we probably want the next one to
       * be unchecked.
       *
       * So actually, this is a stupid plugin.
       *
       * Instead, we need a utility that lets us override the default break
       * but it needs to be based in the current plugin. So if we are in the
       * heading plugin, we can check for a heading and return a paragraph.
       *
       * If we are in the list plugin, we can check for a checked list item
       * and return an unchecked one.
       */
      originalInsertBreak()
    }
    return {
      name: "better-end-of-line-breaks",
    }
  })
