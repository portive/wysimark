import { create } from "zustand"

import { Upload } from "../types"
import { UploadStore } from "./index"

/**
 * Creates an origin store using `zustand`.
 *
 * The purpose of this is to keep track of uploads and their progress but only
 * storing the key to the lookup in the Element itself.
 *
 * This is necessary so that the Element value stays the same even as the image
 * progress is updating during the upload.
 *
 * We want this because we don't want the progress updates to be part of the
 * document's edit history. Consider that a user executes an undo and it undoes
 * the progress of the upload.
 *
 * Te return value of `createUploadStore` is a React hook.
 *
 * The hook should be referenced as `useUploadStore`
 */

export const createUploadStore = (
  { uploads = {} }: { uploads: Record<string, Upload> } = { uploads: {} }
) => {
  return create<UploadStore>((set, get) => ({
    uploads,
    setUpload(id: string, origin: Upload): void {
      set((state: UploadStore) => ({
        uploads: {
          ...state.uploads,
          [id]: origin,
        },
      }))
    },
    getUpload(id: string): Upload {
      const origin = get().uploads[id]
      if (origin === undefined) {
        throw new Error(`Expected origin with id "${id}" but could not find it`)
      }
      return origin
    },
  }))
}
