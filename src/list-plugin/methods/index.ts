import { Editor } from "slate"

import { curry } from "~/src/sink"

import { indent } from "./indent"
import { insertBreak } from "./insert-break"
import { outdent } from "./outdent"
import { toggleOrderedList } from "./toggle-ordered-list"
import { toggleTaskList } from "./toggle-task-list"
import { toggleUnorderedList } from "./toggle-unordered-list"

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
