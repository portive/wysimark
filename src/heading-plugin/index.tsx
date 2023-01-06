export * from "./types"

import {
  createAutocompleteSpaceHandler,
  createHotkeyHandler,
  createPlugin,
  curry,
} from "~/src/sink"

import { insertBreak } from "./insert-break"
import { createHeadingMethods } from "./methods"
import { $Heading } from "./styles"
import { HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.toggleElement.addToggleElementType("heading")
    editor.heading = createHeadingMethods(editor)
    const hotkeyHandler = createHotkeyHandler({
      "super+1": curry(editor.heading.toggleHeading, 1),
      "super+2": curry(editor.heading.toggleHeading, 2),
      "super+3": curry(editor.heading.toggleHeading, 3),
      "super+4": curry(editor.heading.toggleHeading, 4),
      "super+5": curry(editor.heading.toggleHeading, 5),
      "super+6": curry(editor.heading.toggleHeading, 6),
    })
    const autocompleteHandler = createAutocompleteSpaceHandler(editor, {
      "#": curry(editor.heading.setHeading, 1),
      "##": curry(editor.heading.setHeading, 2),
      "###": curry(editor.heading.setHeading, 3),
      "####": curry(editor.heading.setHeading, 4),
      "#####": curry(editor.heading.setHeading, 5),
      "######": curry(editor.heading.setHeading, 6),
    })
    return {
      name: "heading",
      editor: {
        insertBreak: curry(insertBreak, editor),
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "heading") {
            const tag = `h${element.level}`
            return (
              <$Heading as={tag} {...attributes}>
                {children}
              </$Heading>
            )
          }
        },
        onKeyDown: (e) => {
          if (hotkeyHandler(e)) return true
          if (autocompleteHandler(e)) return true
          return false
        },
      },
    }
  })
