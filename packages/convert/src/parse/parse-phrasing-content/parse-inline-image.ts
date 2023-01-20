import type { Image } from "mdast"

import { Segment } from "../../types"

const VALID_HOSTNAMES = ["localhost", "files.portive.com"]

type ImageSize = {
  width: number
  height: number
}

type AllImageSizes = {
  width: number
  height: number
  srcWidth: number
  srcHeight: number
}

function parseSize(s: string | null): ImageSize | null {
  if (typeof s !== "string") return null
  const sizeMatch = s.match(/^(\d+)x(\d+)$/)
  if (sizeMatch === null) return null
  return {
    width: parseInt(sizeMatch[1]),
    height: parseInt(sizeMatch[2]),
  }
}

function extractSizeFromPortiveUrl(s: string): AllImageSizes | null {
  const url = new URL(s)
  if (!VALID_HOSTNAMES.includes(url.hostname)) return null
  const sizeParam = url.searchParams.get("size")
  if (sizeParam === null) return null
  const size = parseSize(sizeParam)
  if (size === null) return null
  const srcSizeMatch = url.pathname.match(/[-][-](\d+)x(\d+)[.][a-zA-Z]+$/)
  if (srcSizeMatch === null) return null
  const width = size.width
  const height = size.height
  const srcWidth = parseInt(srcSizeMatch[1])
  const srcHeight = parseInt(srcSizeMatch[2])
  return { width, height, srcWidth, srcHeight }
}

function extractSizeFromUncommonMarkUrl(s: string): AllImageSizes | null {
  const url = new URL(s)
  if (url.hash.length === 0) return null
  const params = new URLSearchParams(url.hash.slice(1))
  const size = parseSize(params.get("size"))
  const srcSize = parseSize(params.get("srcSize"))
  if (!size || !srcSize) return null
  return {
    width: size.width,
    height: size.height,
    srcWidth: srcSize.width,
    srcHeight: srcSize.height,
  }
}

const extractors = [extractSizeFromPortiveUrl, extractSizeFromUncommonMarkUrl]

function extractSizeFromUrl(s: string): AllImageSizes | null {
  for (const extractor of extractors) {
    const imageSize = extractor(s)
    if (imageSize) return imageSize
  }
  return null
}

export function parseInlineImage(image: Image): Segment[] {
  const size = extractSizeFromUrl(image.url) || {}
  return [
    {
      type: "image-inline",
      url: image.url,
      title: image.title || undefined,
      alt: image.alt || undefined,
      children: [{ text: "" }],
      ...size,
    },
  ]
}
