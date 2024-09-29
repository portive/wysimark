import type { ListItem } from "mdast"

import { Element } from "../../types"
import { parseContent } from "../parse-content"
import { parsePhrasingContents } from "../parse-phrasing-content/parse-phrasing-content"
import { parseList } from "./parse-list"

export function parseListItemChild(
  child: ListItem["children"][number],
  {
    depth,
    ordered,
    checked,
  }: { depth: number; ordered: boolean; checked: boolean | null | undefined }
): Element[] {
  switch (child.type) {
    case "paragraph":
      if (checked === true || checked === false) {
        return [
          {
            type: "task-list-item",
            depth,
            checked,
            children: parsePhrasingContents(child.children),
          },
        ]
      } else if (ordered) {
        return [
          {
            type: "ordered-list-item",
            depth,
            children: parsePhrasingContents(child.children),
          },
        ]
      } else {
        return [
          {
            type: "unordered-list-item",
            depth,
            children: parsePhrasingContents(child.children),
          },
        ]
      }
    case "list":
      return parseList(child, depth + 1)
    default:
      /**
       * NOTE:
       *
       * We break out of a list when the children of a list item are not more
       * lists/list items.
       *
       * This is one area where we don't strictly adhere to the Markdown
       * specification and it is intentional because adhering strictly to the
       * Markdown specification would create a harmful user experience.
       *
       * It appears that Markdown allows nesting other block types in lists
       * other than list items. For example, one can place a table, block
       * quote, heading or something else in a list item.
       *
       * There are a few problems with this from a user perspective:
       *
       * - It's unexpected. No other editors provide such a feature.
       * - If we were to adopt this as a feature, the user experience would be
       *   terrible, namely because it would be unpredictable what commands do
       *   toggle headings or list items should do if they were nested.
       *
       */
      return parseContent(child)
  }
}
