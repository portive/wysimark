import create from "zustand"

import { Upload } from "../types"

/**
 * `OriginState`
 *
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

/**
 * Creates an origin store using `zustand`.
 *
 * The purpose of this is to keep track of uploads and their progress but only
 * storing the key to the lookup in the Element itself. We do it this way
 * because we don't want to modify the Editor value during the upload or it
 * becomes part of the edit history.
 */
export const createUploadStore = (
  {
    origins: origins = {},
  }: {
    origins: Record<string, Upload>
  } = { origins: {} }
) => {
  return create<UploadStore>((set, get) => ({
    uploads: origins,
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
