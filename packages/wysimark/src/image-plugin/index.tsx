import { Transforms } from "slate"

import { createPlugin, curryOne } from "~/src/sink"

import { createImageMethods } from "./methods"
import { normalizeNode } from "./normalize-node"
import { renderElement } from "./render-element"
import { ImagePluginConfig, ImagePluginCustomTypes } from "./types"
import { resizeInBounds } from "./utils"

export const ImagePlugin = ({
  maxInitialInlineImageSize = { width: 64, height: 64 },
  maxInitialImageSize = { width: 320, height: 320 },
  maxImageSize = { width: 1024, height: 1024 },
  imageBlockPresets = [],
  imageInlinePresets = [],
}: ImagePluginConfig = {}) =>
  createPlugin<ImagePluginCustomTypes>((editor) => {
    console.log(imageBlockPresets)
    editor.image = {
      ...createImageMethods(editor),
      maxInitialInlineImageSize,
      maxInitialImageSize,
      maxImageSize,
      imageBlockPresets,
      imageInlinePresets,
    }
    editor.upload.onUploadImageFile = (e) => {
      if (e.width <= 64 && e.height <= 64) {
        Transforms.insertNodes(editor, {
          type: "image-inline",
          url: e.hashUrl,
          title: e.file.name,
          bytes: e.file.size,
          width: e.width,
          height: e.height,
          srcWidth: e.width,
          srcHeight: e.height,
          children: [{ text: "" }],
        })
      } else {
        const initialSize = resizeInBounds(
          { width: e.width, height: e.height },
          maxInitialImageSize || maxImageSize
        )
        Transforms.insertNodes(editor, {
          type: "image-block",
          url: e.hashUrl,
          title: e.file.name,
          bytes: e.file.size,
          width: initialSize.width,
          height: initialSize.height,
          srcWidth: e.width,
          srcHeight: e.height,
          children: [{ text: "" }],
        })
      }
      return true
    }
    return {
      name: "image",
      editor: {
        isVoid: (element) => {
          if (["image-block", "image-inline"].includes(element.type)) {
            return true
          }
        },
        isInline: (element) => {
          if (element.type === "image-inline") return true
        },
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        renderElement,
      },
    }
  })
