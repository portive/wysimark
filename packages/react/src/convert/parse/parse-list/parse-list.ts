import type { List } from "mdast"

import { Element } from "../../types"
import { parseListItem } from "./parse-list-item"

export function parseList(list: List, depth = 0): Element[] {
  // console.log(JSON.stringify(list, null, 2))
  const elements: Element[] = []
  for (const listItem of list.children) {
    elements.push(
      ...parseListItem(listItem, { depth, ordered: !!list.ordered })
    )
  }
  return elements
}
