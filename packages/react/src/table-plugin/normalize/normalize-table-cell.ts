import { Editor, NodeEntry, Transforms } from "slate"

import { TableCellElement } from "../types"

export function normalizeTableCell(
  editor: Editor,
  entry: NodeEntry<TableCellElement>
): boolean {
  const [node, path] = entry
  if (node.children.length === 1 && node.children[0].type === "table-content") {
    return false
  }
  Editor.withoutNormalizing(editor, () => {
    /**
     * This ensures that the first child node of a `table-cell`
     * is a `table-content` node. It won't be if a user pastes
     * in the start of a `table-cell`.
     *
     * We want this because our algorithm will merge all following
     * nodes into this node. If we don't do this, we are merging
     * into a potentially non `table-content` cell and might end up
     * with some other `Element` like a `code-block`.
     *
     * NOTE:
     *
     * In order to make sure this doesn't turn into a noop, we add
     * some text here. It is arbitrarily an `X`.
     */
    Transforms.insertNodes(
      editor,
      {
        type: "table-content",
        children: [{ text: "X" }],
      },
      { at: [...entry[1], 0] }
    )
    /**
     * We then iterate from the back of the children to the front
     * and merging left. Because we inserted an extra node, the
     * for loop looks a little unusual in that `i` starts at
     * `node.children.length` instead of `node.children.length - 1`.
     */
    for (let i = node.children.length; i >= 0; i--) {
      Transforms.mergeNodes(editor, { at: [...path, i] })
    }
    /**
     * When we're done, we remove the `X`.
     *
     * There might be a cleaner way to do this whout adding and
     * removing the `X` and when we find it, we can improve this
     * code.
     *
     * IMPORTANT:
     *
     * Whatever a replacement is, remember that we need to execute
     * the commands such that it preserves the cursor position.
     */
    Transforms.delete(editor, {
      at: { path: [...path, 0, 0], offset: 0 },
      unit: "character",
    })
  })
  return true
}
