import { ActiveImage } from "./types"
import { Editor } from "slate"
import { getUrlInfo } from "@wysimark/resource"

/**
 * The default `activeImage` which is a static image. Just takes the image url
 * and returns the `url` with the `type` of `static` so that the image
 * renderer knows that it can't be resized and that we don't know the width
 * and height of the image either.
 */
function staticActiveImage(url: string): ActiveImage {
  return { type: "static", url }
}

/**
 * Adds active image resizers to the Editor.
 *
 * @param {Editor} editor Editor object
 * @param {string[]} urlPrefixes Array of the start of the URL which are valid
 *     for resizing like `https://*.files.wysimark.com` or
 *     `https://files.wysimark.com/*` or `https://files.mezine.com`.
 *     You can use a * as a wildcard match on alphanumeric plus dash and
 *     underscore
 */
export function withActiveImage(editor: Editor, urlPrefixes: string[]) {
  /**
   * Convert the urlPrefixes
   */
  // const urlRegExps = urlPrefixes.map(convertPrefixToRegExp)
  const originalCreateActiveImage =
    editor.createActiveImage || staticActiveImage
  /**
   * We are setting `createActiveImage` to a method that takes a `url` as an
   * argument and then returns an ActiveImage object.
   *
   * There is a function in it named `resize` which allows us to resize the
   * image and returns a `url` of the resized image.
   *
   * It also tells us other information like that the image is dynamic.
   */
  editor.createActiveImage = (url: string): ActiveImage => {
    for (const urlPrefix of urlPrefixes) {
      /**
       * If it doesn't start with the prefix, check next one.
       */
      if (!url.startsWith(urlPrefix)) continue
      const urlInfo = getUrlInfo(url)

      if (urlInfo.type == "image") {
        return {
          type: "dynamic",
          url,
          resize: (width: number, height: number) =>
            `${url}?size=${width}x${height}`,
          width: urlInfo.width,
          height: urlInfo.height,
          originalWidth: urlInfo.width,
          originalHeight: urlInfo.height,
        }
      } else if (urlInfo.type === "image-query") {
        return {
          type: "dynamic",
          url,
          resize: (width: number, height: number) =>
            `${urlInfo.original.url}?size=${width}x${height}`,
          width: urlInfo.width,
          height: urlInfo.height,
          originalWidth: urlInfo.original.width,
          originalHeight: urlInfo.original.height,
        }
      } else {
        break
      }
    }
    return originalCreateActiveImage(url)
  }
  return editor
}
