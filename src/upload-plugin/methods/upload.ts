import { uploadFile } from "@portive/client"
import { nanoid } from "nanoid"
import { Editor } from "slate"

import { setUpload } from "../store"

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
  const objectUrl = URL.createObjectURL(file)
  uploadFile({
    client,
    file,
    onBeforeFetch: ({ clientFile }) => {
      setUpload(editor, hashUrl, {
        url: objectUrl,
        status: "progress",
        sentBytes: 0,
        totalBytes: clientFile.bytes,
      })
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
    onProgress: ({ sentBytes, totalBytes }) => {
      setUpload(editor, hashUrl, {
        status: "progress",
        url: objectUrl,
        sentBytes,
        totalBytes,
      })
    },
    onError: (e) => {
      setUpload(editor, hashUrl, {
        status: "error",
        url: objectUrl,
        message: e.message,
      })
    },
    onSuccess: (e) => {
      setUpload(editor, hashUrl, {
        status: "success",
        url: e.hostedFile.url,
      })
    },
  })
  return false
}
