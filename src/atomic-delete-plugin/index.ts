import { Editor, Element, Range, Transforms } from "slate"

import { createPlugin, findElementUp } from "~/src/sink"

export type AtomicDeletePluginCustomTypes = {
  Name: "atomic-delete"
  Editor: { atomicDelete: true }
}

export const AtomicDeletePlugin = () =>
  createPlugin<AtomicDeletePluginCustomTypes>((editor) => {
    editor.atomicDelete = true
    return {
      name: "atomic-delete",
      editor: {
        deleteBackward() {
          return false
        },
        deleteForward() {
          const nextEntry = Editor.next(editor, { mode: "lowest" })
          if (!nextEntry) return false
          if (editor.selection == null) return false
          if (Range.includes(editor.selection, nextEntry[1])) return false
          const masterEntry = findElementUp(
            editor,
            (el) => {
              console.log("findElementUp", el)
              return Element.isElement(el) && editor.isMaster(el)
            },
            { at: nextEntry[1] }
          )
          console.log(nextEntry, masterEntry)
          if (!masterEntry) return false
          if (Range.includes(editor.selection, masterEntry[1])) return false
          Transforms.removeNodes(editor, { at: masterEntry[1] })
          return true
        },
      },
    }
  })
