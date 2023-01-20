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

/**
 * TODO:
 *
 * Use this as return data and serialize in the `serializeImageInline` method
 * instead.
 */
type MarkdownImageData = {
  url: string
  hash?: string
}

function serializePortiveImage(image: ImageInlineElement): string | undefined {
  const url = new URL(image.url)
  /**
   * Only parse portive URL if it is a portive recognized domain
   */
  if (url.hostname.match(/[.]portive[.]com$/i) && image.width && image.height) {
    return `![${image.alt}](${image.url}?size=${image.width}x${image.height}${
      typeof image.title === "string" ? ` "${image.title}"` : ""
    })`
  }
}

function serializeUncommonmarkImage(
  image: ImageInlineElement
): string | undefined {
  if (image.width && image.height && image.srcWidth && image.srcHeight) {
    return `![${image.alt}](${image.url}#srcSize=${image.srcWidth}x${
      image.srcHeight
    }&size=${image.width}x${image.height}${
      typeof image.title === "string" ? ` "${image.title}"` : ""
    })`
  }
}

function serializeGenericImage(image: ImageInlineElement) {
  return `![${image.alt}](${image.url}${
    typeof image.title === "string" ? ` "${image.title}"` : ""
  })`
}

const serializers = [
  serializePortiveImage,
  serializeUncommonmarkImage,
  serializeGenericImage,
]

function serializeImageInline(image: ImageInlineElement): string {
  for (const serializer of serializers) {
    const markdown = serializer(image)
    if (markdown) return markdown
  }
  throw new Error(
    `Shouldn't get here because last serializer always returns value`
  )
}
