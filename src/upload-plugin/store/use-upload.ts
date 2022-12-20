import { useSlateStatic } from "slate-react"

import { Upload } from "../types"

/**
 * Takes a `url` and returns the `Upload` associated with it.
 *
 * If it starts with a `#` then it is used as a reference to an Upload in the
 * upload store and returns the `Upload` associated with it.
 *
 * Otherwise, the `url` is an uploaded file and it is returned as such. This
 * would happen if the document is saved and loaded.
 */

export function useUpload(url: string): Upload {
  const editor = useSlateStatic()
  /**
   * We call this even if it's not always required because it calls `useStore`
   * which is a React hook which means it needs to be called consistently.
   */
  const upload = editor.upload.useUploadStore((state) => state.uploads[url])
  if (url.includes("/")) {
    return {
      status: "success",
      url: url,
    }
  } else {
    return upload
  }
}
