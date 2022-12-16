export * from "./types"

import {
  createHotkeyHandler,
  createPlugin,
  curry,
  toggleElements,
} from "~/src/sink"

import { insertBreak } from "./insert-break"
import { HeadingElement, HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.heading = {
      toggleHeading: (level) => {
        toggleElements<HeadingElement>(
          editor,
          (element) => element.type === "heading" && element.level == level,
          { type: "heading", level }
        )
      },
    }
    return {
      name: "heading",
      editor: {
        insertBreak: curry(insertBreak, editor),
        isConvertible(element) {
          if (element.type === "heading") return true
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "heading") {
            const Heading = `h${element.level}`
            return <Heading {...attributes}>{children}</Heading>
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
