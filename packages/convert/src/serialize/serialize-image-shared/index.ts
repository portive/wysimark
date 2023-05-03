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
    if (typeof url === "string") {
      /**
       * Sometimes the serialized URL will return "" which means that the URL
       * hasn't returned yet. When this happens, we don't want the markdown for
       * the image to be added to the final value because the image would be
       * invalid. This happens when the image is uploading.
       */
      if (url === "") return ""
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
