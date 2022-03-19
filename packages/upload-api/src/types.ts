/**
 * Upload File Info
 *
 * The shape of a file (which can be a generic file or an image) passed from
 * the browser to any of the upload APIs.
 */

export type UploadGenericFileInfo = {
  type: "generic"
  filename: string
  bytes: number
}

export type UploadImageFileInfo = {
  type: "image"
  filename: string
  bytes: number
  width: number
  height: number
}

export type UploadFileInfo = UploadGenericFileInfo | UploadImageFileInfo

/**
 * The payload contained in the encoded `jwt` token sent to the Wysimark upload
 * service
 */

export type ServerUploadPayload = {
  type: "server"
  file: UploadFileInfo
  appName: string
  path: string
  apiKeyId: string
  limit?: {
    path: string
    bytes: number
  }
  iat: number
}

/**
 * The properties passed to the Wysimark upload service. The `jwt` value is
 * the encoded `ServerUploadPayload`
 */

export type ServerUploadProps = {
  type: "server"
  jwt: string
}
