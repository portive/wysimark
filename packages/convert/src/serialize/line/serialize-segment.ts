import { Segment } from "../../types"

export function serializeSegment(inline: Segment) {
  if ("text" in inline) {
    return `${inline.text}`
  }
  throw new Error(
    `Unhandled inline element type ${inline.type} in ${JSON.stringify(inline)}`
  )
}
