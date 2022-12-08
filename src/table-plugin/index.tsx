import { Editor, Node, Path, Transforms } from "slate"
export * from "./element-types"

import { createPlugin, matchNodeEOL } from "~/src/sink"

import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from "./element-types"

export type TableEditor = {
  supportsTable: true
}

export type TablePluginCustomTypes = {
  Name: "table"
  Editor: TableEditor
  Element: TableElement | TableRowElement | TableCellElement
}

export const TablePlugin = () =>
  createPlugin<TablePluginCustomTypes>((editor) => {
    editor.supportsTable = true
    return {
      name: "table",
      editor: {
        insertBreak: () => {
          const entry = matchNodeEOL(editor, "heading")
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
        isInline(element) {
          if (["table", "table-row", "table-cell"].includes(element.type))
            return false
        },
        isVoid(element) {
          if (["table", "table-row", "table-cell"].includes(element.type))
            return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          console.log("renderElement in table-plugin", element)
          switch (element.type) {
            case "table":
              return (
                <table {...attributes} style={{ borderCollapse: "collapse" }}>
                  <tbody>{children}</tbody>
                </table>
              )
            case "table-row":
              return <tr {...attributes}>{children}</tr>
            case "table-cell":
              return (
                <td
                  {...attributes}
                  style={{ border: "1px solid silver", padding: "0 0.5em" }}
                >
                  {children}
                </td>
              )
          }
        },
        // onKeyDown: createHotkeyHandler({
        //   "super+1": () => p.toggleTable(1),
        //   "super+2": () => p.toggleTable(2),
        //   "super+3": () => p.toggleTable(3),
        //   "super+4": () => p.toggleTable(4),
        //   "super+5": () => p.toggleTable(5),
        //   "super+6": () => p.toggleTable(6),
        // }),
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
