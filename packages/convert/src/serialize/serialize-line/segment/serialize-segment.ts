import { Text as SlateText } from "slate"
import { ImageInlineElement } from "wysimark/src/image-plugin/types"

import { Segment } from "../../../types"
import { serializeCodeText } from "../segment/serialize-code-text"
import { serializeAnchor } from "./serialize-anchor"
import { serializeNonCodeText } from "./serialize-non-code-text"

export function serializeSegment(segment: Segment): string {
  if (SlateText.isText(segment)) {
    /**
     * If the segment is a `code` segment, we need to use a different strategy
     * for escaping the `code` segment. This is why it needs a separate
     * serializing function.
     */
    if (segment.code) return serializeCodeText(segment)
    /**
     * Otherwise, we use the standard text escaping code.
     */
    return serializeNonCodeText(segment)
  }
  switch (segment.type) {
    case "anchor": {
      return serializeAnchor(segment)
    }
    case "image-inline":
      return serializeImageInline(segment)
    default:
      throw new Error(
        `Unhandled inline Element type for serializing which is ${segment.type}`
      )
  }
}

function serializeImageInline(image: ImageInlineElement): string {
  return `![${image.alt}](${image.url}${
    typeof image.title === "string" ? ` "${image.title}"` : ""
  })`
}
