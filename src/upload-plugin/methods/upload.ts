import { uploadFile } from "@portive/client"
import { nanoid } from "nanoid"
import { Editor } from "slate"

/**
 * Initiate the upload process with a file.
 */
export function upload(editor: Editor, file: File) {
  const { client } = editor.upload
  /**
   * Before an upload is completed, we give the file what we call a hash URL
   * which is identified by starting with a `#` and followed by a unique id
   * that can be used to find the current state of the file upload from start
   * to completed upload.
   */
  const hashUrl = `#${nanoid()}`
  uploadFile({
    client,
    file,
    onBeforeFetch: (e) => {
      const { clientFile } = e
      /**
       * If it's an image, we try to handle it with `onUploadImageFile`.
       */
      if (clientFile.type === "image") {
        if (editor.upload.onUploadImageFile(hashUrl, file)) return true
      }
      /**
       * If it's not an image or `onUploadImageFile` doesn't handle it, then
       * we allow the more general `onUploadFile` to handle it.
       */
      if (editor.upload.onUploadFile(hashUrl, file)) return true
      return false
    },
  })
  return false
}
