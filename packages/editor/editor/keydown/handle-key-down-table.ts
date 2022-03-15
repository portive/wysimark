import { Editor } from "slate"
import {
  Table,
  delayedDownReposition,
  delayedUpReposition,
  tabBackward,
  tabForward,
} from "../table"
import { createKeyDownHandler } from "./create-key-down-handler"

const handleKeyDownInTable = createKeyDownHandler({
  "mod+enter"(editor) {
    Table.insertRow(editor, 1)
    return true
  },
  "mod+shift+enter"(editor) {
    Table.insertRow(editor, 0)
    return true
  },
  // "mod+alt+enter"(editor) {
  //   Table.insertColumn(editor, 1)
  //   return true
  // },
  // "mod+alt+shift+enter"(editor) {
  //   Table.insertColumn(editor, 0)
  //   return true
  // },
  // "mod+backspace"(editor) {
  //   Table.removeRow(editor)
  //   return true
  // },
  // "mod+alt+backspace"(editor) {
  //   Table.removeColumn(editor)
  //   return true
  // },
  // "mod+shift+backspace"(editor) {
  //   Table.removeTable(editor)
  //   return true
  // },
  tab(editor) {
    tabForward(editor)
    return true
  },
  "shift+tab"(editor) {
    tabBackward(editor)
    return true
  },
  up(editor) {
    delayedUpReposition(editor)
    return false // must not stop event
  },
  down(editor) {
    delayedDownReposition(editor)
    return false // must not stop event
  },
})

function handleKeyDownTable(event: React.KeyboardEvent, editor: Editor) {
  if (Table.isInside(editor)) {
    if (handleKeyDownInTable(event.nativeEvent, editor)) return true
  }
}

export { handleKeyDownTable }
