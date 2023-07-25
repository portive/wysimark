import type { Image } from "mdast"

import { ImageData } from "./index"

/**
 * As a fallback, we don't
 */
export function parseGenericImage(image: Image): ImageData {
  return {
    url: image.url,
    title: image.title || undefined,
    alt: image.alt || undefined,
  }
}
