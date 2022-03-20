import { JsonObject } from "type-fest"

export type DemoUploadOptions = {
  type: "demo"
  url: string
}

export type BrowserUploadProps = {
  appName: string
  path: string
  apiKeyId: string
  apiPublicKey: string
}

export type BrowserUploadOptions = {
  type: "browser"
  url: string
} & BrowserUploadProps

export type ServerUploadOptions = {
  type: "server"
  url: string
  data: JsonObject
}

export type UploadOptions =
  | DemoUploadOptions
  | ServerUploadOptions
  | BrowserUploadOptions
