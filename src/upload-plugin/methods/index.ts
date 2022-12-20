import { Editor } from "slate"

import { curry } from "~/src/sink"

import { upload } from "./upload"

export function createUploadMethods(editor: Editor) {
  return {
    upload: curry(upload, editor),
  }
}
