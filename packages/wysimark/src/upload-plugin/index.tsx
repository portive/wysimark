import { Client, createClient } from "@portive/client"

import { createPlugin, TypedPlugin } from "~/src/sink"

import { createUploadMethods } from "./methods"
import { createUploadStore } from "./store"

type UploadMethods = ReturnType<typeof createUploadMethods>

type UploadFileEvent = { hashUrl: string; file: File }
type UploadImageFileEvent = UploadFileEvent & { width: number; height: number }

export type UploadEditor = {
  upload: UploadMethods & {
    client: Client
    onUploadImageFile: (e: UploadImageFileEvent) => boolean
    onUploadFile: (e: UploadFileEvent) => boolean
    useUploadStore: ReturnType<typeof createUploadStore>
  }
}

export type UploadPluginCustomTypes = {
  Name: "upload"
  Editor: UploadEditor
}

export const UploadPlugin = //({ authToken }: { authToken?: string }) =>
  createPlugin<UploadPluginCustomTypes>((editor) => {
    // TODO: This should be passed into options
    const authToken = process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN
    if (!authToken) {
      throw new Error(`You must provide an authToken`)
    }
    const client = createClient({ authToken })
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
    return {
      name: "upload",
      editor: {},
      editableProps: {
        onPaste(e) {
          const files = e.nativeEvent.clipboardData?.files
          if (!files || files.length === 0) return false
          for (const file of files) {
            editor.upload.upload(file)
          }
          return true
        },
        onDrop(e) {
          const files = e.nativeEvent.dataTransfer?.files
          if (!files || files.length === 0) return false
          for (const file of files) {
            editor.upload.upload(file)
          }
          return true
        },
      },
    }
  }) as TypedPlugin<UploadPluginCustomTypes>
