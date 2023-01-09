import { Editor, Point } from "slate"

import { createPlugin, forceNormalizePath } from "~/src/sink"

export type NormalizeAfterDeleteEditor = {
  normalizeAfterDelete: true
}

export type NormalizeAfterDeletePluginCustomTypes = {
  Name: "normalize-after-delete"
  Editor: NormalizeAfterDeleteEditor
}

function forceNormalizeNearestElement(editor: Editor) {
  if (!editor.selection) return
  const entry = Editor.parent(editor, editor.selection)
  forceNormalizePath(editor, entry[1])
}

/**
 * The purpose of this plugin is to have the Slate normalizer execute when an
 * Element is deleted. When text is deleted, the normalizer executes properly
 * but if an entire element is deleted, Slate behaves as if no normalization
 * is required.
 *
 * This fails us in a few normalization scenarios:
 *
 * - The normalizer needs to run when a sibling (previous or next) changes.
 * - The normalizer needs to run when a child is removed
 *
 * The plugin takes a few steps to make things more efficient. Namely, it only
 * executes a normalization if we are deleting backwards and we are at the
 * start of an element, or deleting forwards and we are at the end of an
 * Element. If neither of these are true, the delete will cause a normalzation
 * on its own because the text will have changed.
 */
export const NormalizeAfterDeletePlugin = () =>
  createPlugin<NormalizeAfterDeletePluginCustomTypes>((editor) => {
    editor.normalizeAfterDelete = true
    return {
      name: "normalize-after-delete",
      editor: {
        deleteBackward() {
          if (!editor.selection) return false
          const entry = Editor.parent(editor, editor.selection)
          const isStart = Point.equals(
            Editor.start(editor, entry[1]),
            editor.selection.anchor
          )
          if (!isStart) return false
          return function () {
            forceNormalizeNearestElement(editor)
          }
        },
        deleteForward() {
          if (!editor.selection) return false
          const entry = Editor.parent(editor, editor.selection)
          const isEnd = Point.equals(
            Editor.end(editor, entry[1]),
            editor.selection.anchor
          )
          if (!isEnd) return false
          return function () {
            forceNormalizeNearestElement(editor)
          }
        },
      },
      editableProps: {},
    }
  })
