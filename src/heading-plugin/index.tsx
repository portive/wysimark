export * from "./types"

import { createHotkeyHandler, createPlugin, curry } from "~/src/sink"

import { insertBreak } from "./insert-break"
import { $Heading } from "./styles"
import { HeadingElement, HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.toggleElement.addToggleElementType("heading")
    editor.heading = {
      toggleHeading: (level) => {
        editor.toggleElement.toggleElements<HeadingElement>(
          (element) => element.type === "heading" && element.level == level,
          { type: "heading", level }
        )
      },
    }
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
        onKeyDown: createHotkeyHandler({
          "super+1": curry(editor.heading.toggleHeading, 1),
          "super+2": curry(editor.heading.toggleHeading, 2),
          "super+3": curry(editor.heading.toggleHeading, 3),
          "super+4": curry(editor.heading.toggleHeading, 4),
          "super+5": curry(editor.heading.toggleHeading, 5),
          "super+6": curry(editor.heading.toggleHeading, 6),
        }),
      },
    }
  })
