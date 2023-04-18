import { ImageSharedElement } from "~wysimark/src/image-plugin/types"

import { serializeGenericImageUrl } from "./serialize-generic-image-url"
import { serializePortiveImageUrl } from "./serialize-portive-image-url"
import { serializeUncommonmarkImageUrl } from "./serialize-uncommonmark-image-url"

const urlSerializers = [
  serializePortiveImageUrl,
  serializeUncommonmarkImageUrl,
  serializeGenericImageUrl,
]

export function serializeImageShared(image: ImageSharedElement): string {
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
