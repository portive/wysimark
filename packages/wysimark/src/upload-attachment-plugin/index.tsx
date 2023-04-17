import { Descendant, Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import { createPlugin, curryOne, TypedPlugin } from "~/src/sink"

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

export const UploadAttachmentPlugin =
  createPlugin<UploadAttachmentPluginCustomTypes>(
    (editor, options, { createPolicy }) => {
      editor.uploadAttachment = createUploadAttachmentMethods(editor)
      editor.upload.onUploadFile = ({ hashUrl, file }) => {
        const { selection } = editor
        Transforms.insertNodes(editor, {
          type: "upload-attachment",
          title: file.name,
          url: hashUrl,
          bytes: file.size,
          children: [{ text: "" }],
        })
        /**
         * If there is no selection the element is inserted at the bottom of the
         * editor. When this happens, the insertion point may not be visible and
         * so this code scrolls to the bottom of the editor. We don't do this if
         * there is a selection because if the user made a selection, it is
         * likely already in view.
         */
        if (!selection) {
          const lastPos = Editor.end(editor, [])
          Transforms.select(editor, lastPos)
          ReactEditor.focus(editor)
        }
        return true
      }
      return createPolicy({
        name: "upload-attachment",
        editor: {
          normalizeNode: curryOne(normalizeNode, editor),
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
      })
    }
  ) as TypedPlugin<UploadAttachmentPluginCustomTypes>
