export type Resize = (width: number, height: number) => string

/**
 * An ActiveImage object represents an instance of an Image which is wholly
 * created based on the URL of the image.
 *
 * Images in Wysimark have the width/height encoded in their URL which looks
 * like either an original image url or a resized image url:
 *
 * - original image:
 *   - https://files.wysimark.com/mezine/i/a/b/c/ruewiou82434--640x480.png
 *   - https://mezine.files.wysimark.com/i/a/b/c/ruewiou82434--640x480.png
 * - resized image:
 *   - https://files.wysimark.com/mezine/r/a/b/c/ruewiou82434--640x480--100x75.png
 *   - https://mezine.wysimark.com/r/a/b/c/ruewiou82434--640x480--100x75.png
 */
export type ActiveImage =
  | {
      type: "dynamic"
      resize: Resize
      url: string
      originalWidth: number
      originalHeight: number
      width: number
      height: number
    }
  | { type: "static"; url: string }

/**
 * The method that created active images that is added to the `Editor` instance
 */
export type CreateActiveImage = (url: string) => ActiveImage

export type ActiveImageEditor = {
  createActiveImage: CreateActiveImage
}
