import { Descendant } from "slate"

import { createImageMethods } from "./methods"

export type ImageSize = { width: number; height: number }

export type ImageMethods = ReturnType<typeof createImageMethods>

export type ImagePluginConfig = {
  /**
   * When an image is uploaded, the plugin needs to decide whether the image
   * should be an inline image (like an icon that displays within a line of
   * text) or a block image (like a photo that appears as its own block).
   *
   * This setting is the maximum size of an image for it to be defaulted to an
   * inline image.
   *
   * NOTE:
   *
   * The user can convert an image from one image type to the other manually.
   */
  maxInitialInlineImageSize?: ImageSize // default = { width: 64, height: 64 }
  /**
   * When an image is first uploaded, it may come in at a large size but for
   * some applications, you don't want the image to overwhelm the page,
   * like when the editor is visually a small size.
   *
   * This specifies the maximum initial size when an image is first uploaded
   * to the page. The user can resize to a larger size.
   *
   * If the value is null, the image will be displayed at full size.
   *
   * NOTE:
   *
   * This is the displayed image width. On retina displays, the actualy image
   * file delivered to the browser may be a multiple of the provided value.
   */
  maxInitialImageSize?: ImageSize | null // default = { width: 320, height: 320 }
  /**
   * When an image is displayed at full size, you may still want to limit the
   * size of the image file.
   *
   * NOTE:
   *
   * This is the maximum visual image
   */
  maxImageSize?: ImageSize // default = 1024
}

export type ImageEditor = {
  image: ImageMethods & Required<ImagePluginConfig>
}

export interface ImageInterface {
  /**
   * The `url` represents either
   *
   * - a `hashUrl` that begins with a `#` during the upload process which
   *   represents a unique id reference to a Zustand store where the actual
   *   information about the upload is kept.
   * - The actual `url` of the uploaded file. When the file is saved, the
   *   `hashUrl` will be converted to the actual `url` of the file.
   */
  url: string
  title?: string
  alt?: string
  bytes?: number
  /**
   * If the `maxWidth` and `maxHeight` are present, it indicates that the image
   * is resizable.
   *
   * If they are not present, it indicates that the `width` and `height` should
   * be used, but they cannot be resized.
   *
   * If the `width` and `height` are also not present, it indicates we are not
   * aware of the current size of the image, so just display it.
   */
  srcWidth?: number
  srcHeight?: number
  width?: number
  height?: number
  children: Descendant[]
}
/**
 * Default for larger images, over 48px
 *
 * Larger images can be converted to inline images though.
 */

export type ImageBlockElement = {
  type: "image-block"
} & ImageInterface
/**
 * Default for smaller images, 48px and less
 *
 * Smaller images can be converted to block images though.
 */

export type ImageInlineElement = {
  type: "image-inline"
} & ImageInterface

export type ImagePluginCustomTypes = {
  Name: "image"
  Editor: ImageEditor
  Element: ImageBlockElement | ImageInlineElement
}

/**
 * A preset is defined either as a bound or as a scale:
 *
 * - bounds: The image will be placed within the bounds.
 * - scale: The image will be scaled to the given `scale` value. The max
 *   value should be `1`.
 */

export type ImageSizePreset =
  | { name: string; type: "bounds"; width: number; height: number }
  | { name: string; type: "scale"; scale: number }
