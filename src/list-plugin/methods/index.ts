import { Editor } from "slate"

import { curry } from "~/src/sink"

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
    indent: curry(indent, editor),
    outdent: curry(outdent, editor),
    convertUnorderedList: curry(convertUnorderedList, editor),
    convertOrderedList: curry(convertOrderedList, editor),
    convertTaskList: curry(convertTaskList, editor),
    insertBreak: curry(insertBreak, editor),
  }
}
