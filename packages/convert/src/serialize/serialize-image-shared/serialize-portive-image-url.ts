import { ImageSharedElement } from "~wysimark/src/image-plugin/types"

/**
 * When an image is in the `.portive.com` subdomain like `files.portive.com` or
 * `staging.files.portive.com` and if the image has a `width` and `height` then
 * we encode the `width` and `height in the `url` as part of the query string.
 *
 * https://files.portive.com/f/abcdef--640x480.jpg?size=320x240
 *
 * Indicates a src image of 640x480 that will be resized and sent to the browser
 * at 320x240
 *
 * This does these things:
 *
 * - When parsing the image URL, we are able to pull the width/height out of the
 *   URL and use it to populate those values in the editor.
 *
 * - The query string will also physically resize the image before delivering it
 *   from Portive. This means that in regular Markdown that doesn't have any
 *   special understanding of Portive's special querystring encodings, the image
 *   is still returned in the correct size.
 */
export function serializePortiveImageUrl(
  image: ImageSharedElement
): string | undefined {
  const { hostname } = new URL(image.url)
  /**
   * Only parse portive URL if it is a portive recognized domain
   */
  if (hostname.match(/[.]portive[.]com$/i) && image.width && image.height)
    return `${image.url}?size=${image.width}x${image.height}`
}
