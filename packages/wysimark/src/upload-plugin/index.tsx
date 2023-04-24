import { Client, createClient } from "@portive/client"

import { createPlugin, TypedPlugin } from "~/src/sink"

import { createUploadMethods } from "./methods"
import { createUploadStore } from "./store"

type UploadMethods = ReturnType<typeof createUploadMethods>

type UploadFileEvent = { hashUrl: string; file: File }
type UploadImageFileEvent = UploadFileEvent & { width: number; height: number }

export type UploadEditor = {
  upload: UploadMethods & {
    client?: Client
    onUploadImageFile: (e: UploadImageFileEvent) => boolean
    onUploadFile: (e: UploadFileEvent) => boolean
    useUploadStore: ReturnType<typeof createUploadStore>
  }
}

export type UploadOptions = { upload?: { authToken?: string } }

export type UploadPluginCustomTypes = {
  Name: "upload"
  Editor: UploadEditor
  Options: UploadOptions
}

export const UploadPlugin = //({ authToken }: { authToken?: string }) =>
  createPlugin<UploadPluginCustomTypes>((editor, options) => {
    // TODO: This should be passed into options
    const authToken = options.upload?.authToken // process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN
    if (!authToken) {
      console.warn(`No authToken provided. Uploads are disabled.`)
    }
    const client = authToken ? createClient({ authToken }) : undefined
    editor.upload = {
      client,
      onUploadImageFile: () => {
        console.log("called onUploadImageFile")
        return false
      },
      onUploadFile: () => {
        console.log("called onUploadFile")
        return false
      },
      useUploadStore: createUploadStore(),
      ...createUploadMethods(editor),
    }

    const editableProps = authToken
      ? {
          onPaste(e: React.ClipboardEvent) {
            const files = e.nativeEvent.clipboardData?.files
            if (!files || files.length === 0) return false
            for (const file of files) {
              editor.upload.upload(file)
            }
            return true
          },
          onDrop(e: React.DragEvent) {
            const files = e.nativeEvent.dataTransfer?.files
            if (!files || files.length === 0) return false
            for (const file of files) {
              editor.upload.upload(file)
            }
            return true
          },
        }
      : {}
    return {
      name: "upload",
      editor: {},
      editableProps,
    }
  }) as TypedPlugin<UploadPluginCustomTypes>
