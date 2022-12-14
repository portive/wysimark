import { Editor, NodeEntry, Path, Transforms } from "slate"

import { ListItemElement } from "../types"

export function normalizeListItemHangingContent(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  const [element, path] = entry
  const { children } = element

  /**
   * No hanging indent if children.length is 1.
   * We already know that the first item is ListContentElement because of the
   * `normalizeListItemFirst`
   */
  if (children.length === 1) return false

  const lastIndex = children.length - 1
  const lastChild = children[lastIndex]

  /**
   * If the lastChild isn't a `list-content` it's not a hanging indent.
   * Might be a hanging `list` though.
   */
  if (lastChild.type !== "list-content") return false

  Editor.withoutNormalizing(editor, () => {
    Transforms.wrapNodes(
      editor,
      { type: "list-item", children: [] },
      { at: [...path, lastIndex] }
    )
    Transforms.moveNodes(editor, {
      at: [...path, lastIndex],
      to: Path.next(path),
    })
  })
  return true
}

export function normalizeListItemHangingList(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  const [element, path] = entry
  const { children } = element

  /**
   * No hanging indent if children.length is 2 or less.
   * We know index 0 is going to be ListContentElement because of an earlier
   * normalizer.
   * We know that index 1 is either a `ListContentElement` or `ListElement`.
   * If it's a `ListContentElement`, that's not this normalizer's problem.
   * If it's a `ListElement`, that's valid so we don't worry about it.
   */
  if (children.length <= 2) return false

  const lastIndex = children.length - 1
  const lastChild = children[lastIndex]
  const lastPath = [...path, lastIndex]

  /**
   * If the lastChild isn't a `list-content` it's not a hanging indent.
   * Might be a hanging `list` though.
   */
  if (lastChild.type !== "list") return false

  const nextToLastIndex = children.length - 2
  const nextToLastChild = children[nextToLastIndex]
  const nextToLastPath = [...path, nextToLastIndex]

  if (nextToLastChild.type === "list-content") {
    Editor.withoutNormalizing(editor, () => {
      Transforms.wrapNodes(
        editor,
        { type: "list-item", children: [] },
        { at: Editor.range(editor, nextToLastPath, lastPath) }
      )
      /**
       * NOTE: This is not the same as the similar `moveNodes` method below
       */
      Transforms.moveNodes(editor, {
        at: nextToLastPath,
        to: Path.next(path),
      })
    })
  } else {
    /**
     * If the next to last item isn't a ListContentElement, we wrap the
     * `List` in a `ListItem`. This is invalid but the first item normalizer
     * will fix it for us.
     */
    Editor.withoutNormalizing(editor, () => {
      Transforms.wrapNodes(
        editor,
        { type: "list-item", children: [] },
        { at: [...path, lastIndex] }
      )
      /**
       * NOTE: This is not the same as the similar `moveNodes` method above
       */
      Transforms.moveNodes(editor, {
        at: lastPath,
        to: Path.next(path),
      })
    })
  }
  return true
}
