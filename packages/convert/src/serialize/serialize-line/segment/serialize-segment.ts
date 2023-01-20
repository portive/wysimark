import { Text as SlateText } from "slate"

import { Segment } from "../../../types"
import { assertUnreachable } from "../../../utils"
import { serializeCodeText } from "../segment/serialize-code-text"
import { serializeAnchor } from "./serialize-anchor"
import { serializeInlineImage } from "./serialize-inline-image"
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
      return serializeInlineImage(segment)
    default:
      assertUnreachable(segment)
  }
}
