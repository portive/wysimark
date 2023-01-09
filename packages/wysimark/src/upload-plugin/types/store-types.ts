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
  status: "progress"
  sentBytes: number
  totalBytes: number
}

/**
 * Indicates an `Origin` that has completed uploading
 */
export type UploadComplete = {
  status: "success"
  /**
   * This is a URL to the final place of the file
   */
  url: string
}

/**
 * Indicates an `Origin` that has an error during uploading and the Error
 * message
 */
export type UploadError = {
  status: "error"
  url: string
  message: string
}

export type Upload = UploadProgress | UploadComplete | UploadError
