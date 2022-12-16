import { Editor } from "slate"

import { transformNodes } from "~/src/sink"

import { isListItem, ListItemElement } from ".."

export function indent(editor: Editor) {
  return transformNodes<ListItemElement>(editor, {
    match: isListItem,
    convert: (node) => ({ depth: node.depth + 1 }),
  })
}
