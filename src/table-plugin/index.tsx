import { Editor, Node, Path, Transforms } from "slate"
import { useSelected } from "slate-react"
export * from "./element-types"

import {
  createHotkeyHandler,
  createPlugin,
  matchEndOfElement,
} from "~/src/sink"

import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from "./element-types"
import { MinusIcon, PlusIcon } from "./icons"
import { renderElement } from "./render-element"
import { createTableMethods } from "./table-methods"

export type TableEditor = {
  supportsTable: true
  tablePlugin: {
    // getTableInfo: () => void
    // tabForward: () => boolean
    // tabBackward: () => boolean
    insertRow: (offset: 0 | 1) => boolean
    removeTable: () => boolean
    removeRow: () => boolean
  }
}

export type TablePluginCustomTypes = {
  Name: "table"
  Editor: TableEditor
  Element: TableElement | TableRowElement | TableCellElement
}

export const TablePlugin = () =>
  createPlugin<TablePluginCustomTypes>((editor) => {
    editor.supportsTable = true
    const p = (editor.tablePlugin = createTableMethods(editor))
    return {
      name: "table",
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
        renderElement,
        // renderElement: ({ element, attributes, children }) => {
        //   const selected = useSelected()
        //   switch (element.type) {
        //     case "table":
        //       return (
        //         <table {...attributes} style={{ borderCollapse: "collapse" }}>
        //           <tbody>{children}</tbody>
        //         </table>
        //       )
        //     case "table-row":
        //       return (
        //         <tr {...attributes} style={{ position: "relative" }}>
        //           {children}
        //           {selected ? (
        //             <div
        //               contentEditable={false}
        //               style={{
        //                 position: "absolute",
        //                 top: 0,
        //                 bottom: 0,
        //                 left: "-1em",
        //                 width: "1em",
        //                 background: "#e0e0e0",
        //               }}
        //               onMouseDown={() => p.removeRow()}
        //             />
        //           ) : undefined}
        //         </tr>
        //       )
        //     case "table-cell":
        //       return (
        //         <td
        //           {...attributes}
        //           style={{ border: "1px solid silver", padding: "0 0.5em" }}
        //         >
        //           {children}
        //         </td>
        //       )
        //   }
        // },
        onKeyDown: createHotkeyHandler({
          "mod+shift+enter": () => p.insertRow(0),
          "mod+enter": () => p.insertRow(1),
          //   "super+1": () => p.toggleTable(1),
          //   "super+2": () => p.toggleTable(2),
          //   "super+3": () => p.toggleTable(3),
          //   "super+4": () => p.toggleTable(4),
          //   "super+5": () => p.toggleTable(5),
          //   "super+6": () => p.toggleTable(6),
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
