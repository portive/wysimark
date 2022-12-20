/**
 * Indicates an `Origin` that is uploading and the state of the Upload
 */
export type UploadProgress = {
  /**
   * This is a URL but not the final upload URL. This is a URL that represents
   * a secure value in the form of a string that represents a location on the
   * user's computer.
   */
  url: string
  status: "uploading"
  sentBytes: number
  totalBytes: number
}

/**
 * Indicates an `Origin` that has completed uploading
 */
export type UploadComplete = {
  /**
   * This is a URL to the final place of the file
   */
  url: string
  status: "complete"
}

/**
 * Indicates an `Origin` that has an error during uploading and the Error
 * message
 */
export type UploadError = {
  url: string
  status: "error"
  message: string
}

export type Upload = UploadProgress | UploadComplete | UploadError
