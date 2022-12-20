import { uploadFile } from "@portive/client"
import { nanoid } from "nanoid"
import { Editor } from "slate"

import { curry } from "~/src/sink"

function upload(editor: Editor, file: File) {
  const { client } = editor.upload
  const hash = nanoid()
  uploadFile({ client, file })
}

export function createUploadMethods(editor: Editor) {
  return {
    upload: curry(upload, editor),
  }
}
