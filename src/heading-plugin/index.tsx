export * from "./types"

import { Editor, Node, Path, Transforms } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  matchEndOfElement,
  toggleElements,
} from "~/src/sink"

import { HeadingElement, HeadingPluginCustomTypes } from "./types"

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.supportsHeadings = true
    const p = (editor.headingPlugin = {
      toggleHeading: (level) => {
        toggleElements<HeadingElement>(
          editor,
          (element) => element.type === "heading" && element.level == level,
          { type: "heading", level }
        )
      },
    })
    return {
      name: "heading",
      editor: {
        insertBreak: () => {
          const entry = matchEndOfElement(editor, "heading")
          if (!entry) return false
          insertNodesAndSelectAt(
            editor,
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
            Path.next(entry[1])
          )
          return true
        },
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
          "super+1": () => p.toggleHeading(1),
          "super+2": () => p.toggleHeading(2),
          "super+3": () => p.toggleHeading(3),
          "super+4": () => p.toggleHeading(4),
          "super+5": () => p.toggleHeading(5),
          "super+6": () => p.toggleHeading(6),
        }),
      },
    }
  })

function insertNodesAndSelectAt(
  editor: Editor,
  nodes: Node | Node[],
  at: Path
) {
  Transforms.insertNodes(editor, nodes, { at })
  Transforms.select(editor, {
    anchor: Editor.start(editor, at),
    focus: Editor.start(editor, at),
  })
}

// function insertBreakAtEndOfElement<T extends Element = Element>(
//   editor: Editor,
//   elementMatcher: MatchNode,
//   convertElement: ConvertElement
// ) {
//   const entry = matchEndOfElement(editor, elementMatcher)
//   if (!entry) return false
//   const nextElement = fixConvertElement(convertElement)(entry[0])
// }
