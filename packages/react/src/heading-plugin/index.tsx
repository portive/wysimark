export * from "./types"

import {
  createAutocompleteSpaceHandler,
  createHotkeyHandler,
  createPlugin,
  curryOne,
  curryTwo,
  TypedPlugin,
} from "~/src/sink"

import { insertBreak } from "./insert-break"
import { createHeadingMethods } from "./methods"
import { $H1, $H2, $H3, $H4, $H5, $H6 } from "./styles"
import { HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = createPlugin<HeadingPluginCustomTypes>(
  (editor) => {
    editor.convertElement.addConvertElementType("heading")
    editor.heading = createHeadingMethods(editor)
    const hotkeyHandler = createHotkeyHandler({
      "super+1": curryTwo(editor.heading.convertHeading, 1, true),
      "super+2": curryTwo(editor.heading.convertHeading, 2, true),
      "super+3": curryTwo(editor.heading.convertHeading, 3, true),
      "super+4": curryTwo(editor.heading.convertHeading, 4, true),
      "super+5": curryTwo(editor.heading.convertHeading, 5, true),
      "super+6": curryTwo(editor.heading.convertHeading, 6, true),
    })
    const autocompleteHandler = createAutocompleteSpaceHandler(editor, {
      "#": curryTwo(editor.heading.convertHeading, 1, false),
      "##": curryTwo(editor.heading.convertHeading, 2, false),
      "###": curryTwo(editor.heading.convertHeading, 3, false),
      "####": curryTwo(editor.heading.convertHeading, 4, false),
      "#####": curryTwo(editor.heading.convertHeading, 5, false),
      "######": curryTwo(editor.heading.convertHeading, 6, false),
    })
    return {
      name: "heading",
      editor: {
        insertBreak: curryOne(insertBreak, editor),
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "heading") {
            switch (element.level) {
              case 1:
                return <$H1 {...attributes}>{children}</$H1>
              case 2:
                return <$H2 {...attributes}>{children}</$H2>
              case 3:
                return <$H3 {...attributes}>{children}</$H3>
              case 4:
                return <$H4 {...attributes}>{children}</$H4>
              case 5:
                return <$H5 {...attributes}>{children}</$H5>
              case 6:
                return <$H6 {...attributes}>{children}</$H6>
              default:
                throw new Error(
                  `Expected element.level to be 1-6 but got ${element.level}`
                )
            }
          }
        },
        onKeyDown: (e) => {
          if (hotkeyHandler(e)) return true
          if (autocompleteHandler(e)) return true
          return false
        },
      },
    }
  }
) as TypedPlugin<HeadingPluginCustomTypes>
