import { Editor } from "slate"

import { curry } from "~/src/sink"

import {
  toggleOrderedList,
  toggleTaskList,
  toggleUnorderedList,
} from "./convert-list-item"
import { indent } from "./indent"
import { insertBreak } from "./insert-break"
import { outdent } from "./outdent"

export function createListMethods(editor: Editor) {
  return {
    indent: curry(indent, editor),
    outdent: curry(outdent, editor),
    toggleUnorderedList: curry(toggleUnorderedList, editor),
    toggleOrderedList: curry(toggleOrderedList, editor),
    toggleTaskList: curry(toggleTaskList, editor),
    insertBreak: curry(insertBreak, editor),
  }
}
