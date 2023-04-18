import { ListItemElement } from "~wysimark/src/list-plugin/types"

import { Element } from "../../types"

/**
 * Provides a type guard for `ListItemElement`.
 */
function isListItemElement(element: Element): element is ListItemElement {
  return (
    element.type === "ordered-list-item" ||
    element.type === "unordered-list-item" ||
    element.type === "task-list-item"
  )
}

export function normalizeElementListDepths(elements: Element[]) {
  const normalizedElements: Element[] = []

  /**
   * previousDepth of -1 indicates that the previous element was not a list
   * item.
   */
  let previousDepth = -1

  for (const element of elements) {
    /**
     * If it's not a list item, just reset previousDepth and add the element
     * to `normalizedElements`.
     */
    if (!isListItemElement(element)) {
      normalizedElements.push(element)
      previousDepth = -1
      continue
    }

    /**
     * If it is a list item, we need to make sure the depth never increases by
     * more than 1. This is important because if we skip the first depth (i.e.
     * we start at depth of 2) then we get the first list indented which makes
     * Markdown think it's a code block. After the first list item, we don't
     * want to indent by more than one depth level because Markdown will assume
     * that's still a single depth level. When we outdent a level, Markdown
     * could get confused.
     *
     * WARNING:
     *
     * This does create a situation where the list in Wysimark is not saved and
     * loaded to return the same document; however, the alternative is that we
     * prevent the editor from creating a list which skips a depth. This could
     * be perceived as broken UI by the user. This appraoch feels less obtrusive
     * to the user.
     */
    const nextDepth =
      element.depth > previousDepth + 1 ? previousDepth + 1 : element.depth
    normalizedElements.push({ ...element, depth: nextDepth })
    previousDepth = nextDepth
  }

  return normalizedElements
}
