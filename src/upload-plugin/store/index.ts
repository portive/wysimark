import { Editor } from "slate"

import { Upload } from "../types"
export * from "./create-upload-store"
export * from "./use-upload"

/**
 * Types related to the `zustand` state-management library which we use to
 * store the state of uploads.
 */

export type GetUpload = (id: string) => Upload
export type SetUpload = (id: string, upload: Upload) => void

export type UploadStore = {
  uploads: Record<string, Upload>
  getUpload: GetUpload
  setUpload: SetUpload
}

export function setUpload(editor: Editor, id: string, upload: Upload) {
  const store = editor.upload.useUploadStore.getState()
  store.setUpload(id, upload)
}
