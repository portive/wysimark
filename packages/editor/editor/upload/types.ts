/**
 * Initial state when we are waiting for the server to give us the policy so
 * that we can upload to Amazon
 */
type UploadInitializing = { status: "waiting" }

/**
 * State while we are sending files to Amazon S3
 */
type UploadSending = {
  status: "sending"
  loaded: number
  total: number
}

/**
 * State after a successful upload
 */
type UploadSuccess = {
  status: "success"
  loaded: number
  total: number
  fileUrl: string
  width?: number
  height?: number
}

/**
 * State if there is an error anywhere along the way
 */
type UploadError = { status: "error"; message: string }

/**
 * Combined Upload state
 */
export type UploadState =
  | UploadInitializing
  | UploadSending
  | UploadSuccess
  | UploadError
