import { Element } from "../types"

export function parseThematicBreak(): Element[] {
  return [
    {
      type: "horizontal-rule",
      children: [{ text: "" }],
    },
  ]
}
