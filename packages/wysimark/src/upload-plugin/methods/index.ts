import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { upload } from "./upload"

export function createUploadMethods(editor: Editor) {
  return {
    upload: curryOne(upload, editor),
  }
}
