import { ImageSharedElement } from "wysimark/src/image-plugin/types"

/**
 * As a fallback, if there is no width/height or srcWidth/srcHeight info then
 * just save the image url and do not save with uncommonMark hints.
 */
export function serializeGenericImageUrl(image: ImageSharedElement): string {
  return image.url
}
