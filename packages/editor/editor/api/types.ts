import { JsonObject } from "type-fest"

type SharedUploadProps = {
  appName: string
  documentId: string
  context: JsonObject
  filename: string
  fileSize: number
  jwt?: string
}

export type APIUploadProps =
  | ({ type: "file" } & SharedUploadProps)
  | ({
      type: "image"
      imageWidth: number
      imageHeight: number
    } & SharedUploadProps)

export type APIUploadResponse =
  | {
      status: "success"
      data: {
        formFields: Record<string, string>
        apiUrl: string
        fileUrl: string
      }
    }
  | { status: "error"; message: string }
