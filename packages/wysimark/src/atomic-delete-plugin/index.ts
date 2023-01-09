import { Editor, Transforms } from "slate"

import { createPlugin } from "~/src/sink"

import { isSafeDelete } from "./is-safe-delete"

export type AtomicDeletePluginCustomTypes = {
  Name: "atomic-delete"
  Editor: { atomicDelete: true }
}

/**
 * The Atomic Delete plugin protects master/slave related elements from being
 * put into a bad state after a delete.
 *
 * This can happen because Slate's default delete behavior does not take into
 * account the relationship between master/slave elements.
 *
 * Specifically, atomic delete protects against the following situations:
 *
 * - User forward deletes from just before a table. The first cell in the
 *   table is deleted leaving a first row with one less cell than the rest
 *   of the table.
 *
 * - User forward deletes at the end of a code block. Text from outside the
 *   code block is pulled into the code block.
 *
 * - User backward deletes from just after a code block. Text from outside the
 *   code block is pulled into the code block.
 *
 * - User backward deletes at the start of a code block. Text from inside the
 *   code block is pulled outside the code block.
 */
export const AtomicDeletePlugin = () =>
  createPlugin<AtomicDeletePluginCustomTypes>((editor) => {
    editor.atomicDelete = true
    return {
      name: "atomic-delete",
      editor: {
        deleteBackward() {
          if (editor.selection == null) return false
          const entry = Editor.node(editor, editor.selection)
          const prevEntry = Editor.previous(editor, { mode: "lowest" })
          if (isSafeDelete(editor, entry, prevEntry)) return false
          Transforms.move(editor, { unit: "character", reverse: true })
          return true
        },
        deleteForward() {
          if (editor.selection == null) return false
          const entry = Editor.node(editor, editor.selection)
          const nextEntry = Editor.next(editor, { mode: "lowest" })
          if (isSafeDelete(editor, entry, nextEntry)) return false
          Transforms.move(editor, { unit: "character" })
          return true
        },
      },
    }
  })
