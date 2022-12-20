import { Descendant, Transforms } from "slate"

import { createPlugin, curry } from "~/src/sink"

import { UploadEditor } from "../upload-plugin"
import { createUploadAttachmentMethods } from "./methods"
import { normalizeNode } from "./normalize-node"
import { renderElement } from "./render-element"

type UploadAttachmentMethods = ReturnType<typeof createUploadAttachmentMethods>

export type UploadAttachmentEditor = {
  uploadAttachment: UploadAttachmentMethods
}

export type UploadAttachmentElement = {
  type: "upload-attachment"
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
  title: string
  bytes?: number
  children: Descendant[]
}

export type UploadAttachmentPluginCustomTypes = {
  Name: "upload-attachment"
  Editor: UploadAttachmentEditor & UploadEditor
  Element: UploadAttachmentElement
}

export const UploadAttachmentPlugin = () =>
  createPlugin<UploadAttachmentPluginCustomTypes>((editor) => {
    editor.uploadAttachment = createUploadAttachmentMethods(editor)
    editor.upload.onUploadFile = (hashUrl, file) => {
      Transforms.insertNodes(editor, {
        type: "upload-attachment",
        title: file.name,
        url: hashUrl,
        bytes: file.size,
        children: [{ text: "" }],
      })
      return true
    }
    return {
      name: "upload-attachment",
      editor: {
        normalizeNode: curry(normalizeNode, editor),
        isVoid: (el) => {
          if (el.type === "upload-attachment") return true
        },
        isInline: (el) => {
          if (el.type === "upload-attachment") return true
        },
      },
      editableProps: {
        renderElement,
      },
    }
  })
