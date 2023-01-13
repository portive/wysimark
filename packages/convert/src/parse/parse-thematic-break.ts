import { Element } from "wysimark/src"

export function parseThematicBreak(): Element[] {
  return [
    {
      type: "horizontal-rule",
      children: [{ text: "" }],
    },
  ]
}
