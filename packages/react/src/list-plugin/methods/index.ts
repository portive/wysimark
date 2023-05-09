import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import {
  convertOrderedList,
  convertTaskList,
  convertUnorderedList,
} from "./convert-list-item"
import { indent } from "./indent"
import { insertBreak } from "./insert-break"
import { outdent } from "./outdent"

export function createListMethods(editor: Editor) {
  return {
    indent: curryOne(indent, editor),
    outdent: curryOne(outdent, editor),
    convertUnorderedList: curryOne(convertUnorderedList, editor),
    convertOrderedList: curryOne(convertOrderedList, editor),
    convertTaskList: curryOne(convertTaskList, editor),
    insertBreak: curryOne(insertBreak, editor),
  }
}
