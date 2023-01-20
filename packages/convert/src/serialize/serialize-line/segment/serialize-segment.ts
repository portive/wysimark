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
      return serializeInlineImage(segment)
    default:
      throw new Error(
        `Unhandled inline Element type for serializing which is ${segment.type}`
      )
  }
}

function serializeInlineImage(image: ImageInlineElement): string {
  for (const urlSerializer of urlSerializers) {
    const url = urlSerializer(image)
    if (url) {
      return `![${image.alt}](${url}${
        typeof image.title === "string" ? ` "${image.title}"` : ""
      })`
    }
  }
  /**
   * Shouldn't get here because the last url seializer `serializeGenericUrl`
   * always returns a value.
   */
  throw new Error(`Shouldn't get here`)
}

function serializePortiveImageUrl(
  image: ImageInlineElement
): string | undefined {
  const { hostname } = new URL(image.url)
  /**
   * Only parse portive URL if it is a portive recognized domain
   */
  if (!hostname.match(/[.]portive[.]com$/i) || !image.width || !image.height)
    return
  return `${image.url}?size=${image.width}x${image.height}`
}

function serializeUncommonmarkImageUrl(
  image: ImageInlineElement
): string | undefined {
  if (!image.width || !image.height || !image.srcWidth || !image.srcHeight)
    return
  return `${image.url}#srcSize=${image.srcWidth}x${image.srcHeight}&size=${image.width}x${image.height}`
}

function serializeGenericImageUrl(image: ImageInlineElement): string {
  return image.url
}

const urlSerializers = [
  serializePortiveImageUrl,
  serializeUncommonmarkImageUrl,
  serializeGenericImageUrl,
]
