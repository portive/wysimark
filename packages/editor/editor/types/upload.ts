import { JsonObject } from "type-fest"

/**
 * DemoUploadProps, BrowserUploadProps and ServerUploadProps should be exported
 * so that they can be used by the upload servers to confirm that the API
 * matches on the server.
 */
export type DemoUploadProps = {
  type: "demo"
}

export type BrowserUploadProps = {
  type: "browser"
  appName: string
  path: string
  apiKeyId: string
  apiPublicKey: string
}

export type ServerUploadProps = {
  type: "server"
  data: JsonObject
}

export type DemoUploadOptions = {
  url: string
} & DemoUploadProps

export type BrowserUploadOptions = {
  url: string
} & BrowserUploadProps

export type ServerUploadOptions = {
  url: string
} & ServerUploadProps

export type UploadOptions =
  | DemoUploadOptions
  | ServerUploadOptions
  | BrowserUploadOptions
