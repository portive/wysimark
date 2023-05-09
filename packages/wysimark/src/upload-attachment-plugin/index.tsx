import { Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import { AnchorElement } from "~/src/anchor-plugin"
import { createPlugin, TypedPlugin } from "~/src/sink"

import { UploadEditor } from "../upload-plugin"

export type UploadAttachmentEditor = {
  uploadAttachment: {}
}

export type UploadAttachmentPluginCustomTypes = {
  Name: "upload-attachment"
  Editor: UploadAttachmentEditor & UploadEditor
}

export const UploadAttachmentPlugin =
  createPlugin<UploadAttachmentPluginCustomTypes>(
    (editor, options, { createPolicy }) => {
      editor.uploadAttachment = {}
      editor.upload.onUploadFile = ({ hashUrl, file }) => {
        const { selection } = editor
        Transforms.insertText(editor, `🔗 `)
        Transforms.insertNodes(editor, {
          type: "anchor",
          href: hashUrl,
          children: [{ text: file.name }],
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
        /**
         * Moves the cursor just outside of the inserted Anchor element.
         */
        Transforms.move(editor, { distance: 1, unit: "offset" })
        return true
      }

      editor.upload.onUploadFileSuccess = (e) => {
        editor.upload.setElementTimeTraveling<AnchorElement>(
          { href: e.hashUrl },
          { href: e.url }
        )
        return true
      }

      return createPolicy({
        name: "upload-attachment",
      })
    }
  ) as TypedPlugin<UploadAttachmentPluginCustomTypes>
