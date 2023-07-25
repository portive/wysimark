import type { Image } from "mdast"

import { parseUrl } from "../../../parseUrl"
import { ImageData } from "./index"
import { parseSize } from "./parse-utils"

export function parsePortiveImage(image: Image): ImageData | undefined {
  // const url = new URL(image.url)
  const url = parseUrl(image.url)
  /**
   * Only parse portive URL if it is a portive recognized domain
   */
  if (!url.hostname.match(/[.]portive[.]com$/i)) return
  /**
   * Should have a size param as part of the query string
   */
  const sizeParam = url.searchParams.get("size")
  if (sizeParam === null) return
  /**
   * And the query string should parse properly as an ImageSize
   */
  const size = parseSize(sizeParam)
  if (size === null) return
  /**
   * The Portive image URL should end in something like `--640x480.jpg` which
   * identifies its width/height.
   */
  const srcSizeMatch = url.pathname.match(/[-][-](\d+)x(\d+)[.][a-zA-Z]+$/)
  if (srcSizeMatch === null) return
  /**
   * Return the `ImageData`
   */
  return {
    url: `${url.origin}${url.pathname}`,
    title: image.title || undefined,
    alt: image.alt || undefined,
    width: size.width,
    height: size.height,
    srcWidth: parseInt(srcSizeMatch[1]),
    srcHeight: parseInt(srcSizeMatch[2]),
  }
}
