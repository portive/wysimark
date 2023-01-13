import { Element } from "wysimark/src"

import { serializeLine } from "./line"

export function serializeElement(element: Element) {
  switch (element.type) {
    case "heading":
      return `${"#".repeat(element.level)} ${serializeLine(
        element.children
      )}\n\n`
      break
    case "paragraph":
      return `${serializeLine(element.children)}\n\n`
    case "horizontal-rule":
      return "---\n\n"
  }

  throw new Error(
    `Unhandled element.type ${element.type} in element ${JSON.stringify(
      element
    )}`
  )
}
