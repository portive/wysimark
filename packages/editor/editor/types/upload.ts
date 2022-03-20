import { JsonObject } from "type-fest"

/**
 * Upload File Info
 *
 * The shape of information passed from the browser to the upload API.
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
 * Upload Base types used to create UploadProps and UploadOptions
 */

export type DemoUploadBase = {
  type: "demo"
}

export type BrowserUploadBase = {
  type: "browser"
  appName: string
  path: string
  apiKeyId: string
  apiPublicKey: string
}

export type ServerUploadBase = {
  type: "server"
  data: JsonObject
}

/**
 * Upload Props from Upload Base
 *
 * DemoUploadProps, BrowserUploadProps and ServerUploadProps should be exported
 * so that they can be used by the upload servers to confirm that the API
 * matches on the server.
 */

type FixedUploadProps = { file: UploadFileInfo }

export type DemoUploadProps = FixedUploadProps & DemoUploadBase
export type BrowserUploadProps = FixedUploadProps & BrowserUploadBase
export type ServerUploadProps = FixedUploadProps & ServerUploadBase
export type UploadProps =
  | DemoUploadProps
  | BrowserUploadProps
  | ServerUploadProps

/**
 * Upload Options from Upload Base
 */

type FixedUploadOptions = { url: string }

export type DemoUploadOptions = FixedUploadOptions & DemoUploadBase
export type BrowserUploadOptions = FixedUploadOptions & BrowserUploadBase
export type ServerUploadOptions = FixedUploadOptions & ServerUploadBase

export type UploadOptions =
  | DemoUploadOptions
  | ServerUploadOptions
  | BrowserUploadOptions
