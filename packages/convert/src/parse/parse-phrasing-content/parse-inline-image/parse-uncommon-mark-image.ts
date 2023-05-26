import type { Image } from "mdast"

import { parseUrl } from "../../../parseUrl"
import { ImageData } from "./index"
import { parseSize } from "./parse-utils"

/**
 * UncommonMark images are just regular images with some additional encoding in
 * the URL hash which allows us to embed extra information without affecting the
 * image that is rendered nor does it affect the `title` or `alt` attributes.
 */
export function parseUncommonMarkImage(image: Image): ImageData | undefined {
  const url = parseUrl(image.url)
  /**
   * If there's no hash, it's not UncommonMark
   */
  if (url.hash.length === 0) return
  /**
   * We use `URLSearchParams` to decode the size data after the `#` because it's
   * free (embedded in every browser without more code) and available (including
   * Node)!
   */
  const params = new URLSearchParams(url.hash.slice(1))
  const size = parseSize(params.get("size"))
  const srcSize = parseSize(params.get("srcSize"))
  if (!size || !srcSize) return
  /**
   * If we successfully parsed all the ImageSize info, then return the
   * `ImageData`
   */
  return {
    url: `${url.origin}${url.pathname}`,
    title: image.title || undefined,
    alt: image.alt || undefined,
    width: size.width,
    height: size.height,
    srcWidth: srcSize.width,
    srcHeight: srcSize.height,
  }
}
