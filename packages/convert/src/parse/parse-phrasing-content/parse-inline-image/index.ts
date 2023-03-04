import type { Image } from "mdast"
import { ImageSharedElement } from "wysimark/src/image-plugin/types"

import { Segment } from "../../../types"
import { imageParsers } from "./image-parsers"

export type ImageData = Omit<ImageSharedElement, "children">

/**
 * Iterate through all the image parsers utnil we find one that returns
 * `ImageData`. Combine that `ImageData` with the `type` and `children` and
 * return it as the `ImageInlineElement`
 */
export function parseInlineImage(image: Image): Segment[] {
  for (const imageParser of imageParsers) {
    const imageData = imageParser(image)
    if (!imageData) continue
    return [
      {
        type: "image-inline",
        ...imageData,
        children: [{ text: "" }],
      },
    ]
  }
  throw new Error(`Shouldn't get here because last parser always returns data`)
}
