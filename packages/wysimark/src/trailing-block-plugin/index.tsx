import { Editor, Element, Node, Path, Transforms } from "slate"

import { createPlugin } from "~/src/sink"

type TrailingBlockPluginCustomType = {
  Name: "trailing-block"
  Editor: { allowTrailingBlock: true }
}

type Config = {
  /**
   * This needs to be a function instead of an Object because we want the
   * resulting object to be reference unique. This is because the object is
   * used in Slate's WeakMap and we end up with errors related to duplicate
   * keys.
   */
  createTrailingBlock: () => Element
}

export const TrailingBlockPlugin = (config: Config) =>
  createPlugin<TrailingBlockPluginCustomType>((editor) => {
    editor.allowTrailingBlock = true
    return {
      name: "trailing-block",
      editor: {
        normalizeNode: (entry) => {
          if (!Editor.isEditor(entry[0])) return false
          const lastPath = [editor.children.length - 1]
          /**
           * We expect the last node of the Editor to be an `Element` because
           * the children of an `Editor` are `Element` objects.
           */
          const lastElement = Node.child(
            editor,
            editor.children.length - 1
          ) as Element
          /**
           * We need to add a trailing block when it is not easy for us to
           * start typing at the end of the document. This happens in these
           * conditions:
           *
           * - The last Element is a `void` block that we can't type into
           * - The last Element is an Element that contains child elements
           *   like a `table` or a nested `list`.
           */
          if (
            Editor.hasBlocks(editor, lastElement) ||
            Editor.isVoid(editor, lastElement)
          ) {
            Transforms.insertNodes(editor, config.createTrailingBlock(), {
              at: Path.next(lastPath),
            })
          }
          return true
        },
      },
    }
  })
