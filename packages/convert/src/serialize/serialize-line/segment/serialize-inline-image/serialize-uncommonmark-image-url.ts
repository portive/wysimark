import { ImageInlineElement } from "wysimark/src/image-plugin/types"

/**
 * In UncommonMark, we provide hints after the hash `#` portion of the URL that
 * does not affect the URL of the image being delivered. It is usually used to
 * tell the browser to scroll to the given section in a linked document.
 *
 * https://imageservice.com/abcdefg.jpg#srcSize=1024x768&size=640x480
 */
export function serializeUncommonmarkImageUrl(
  image: ImageInlineElement
): string | undefined {
  if (image.width && image.height && image.srcWidth && image.srcHeight)
    return `${image.url}#srcSize=${image.srcWidth}x${image.srcHeight}&size=${image.width}x${image.height}`
}
