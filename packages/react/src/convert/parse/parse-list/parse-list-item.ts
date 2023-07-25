import type { ListItem } from "mdast"

import { Element } from "../../types"
import { parseListItemChild } from "./parse-list-item-child"

export function parseListItem(
  listItem: ListItem,
  options: { depth: number; ordered: boolean }
): Element[] {
  const elements: Element[] = []
  for (const child of listItem.children) {
    elements.push(
      ...parseListItemChild(child, { ...options, checked: listItem.checked })
    )
  }
  return elements
}
