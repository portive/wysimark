import { Client, createClient } from "@portive/client"
import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

import { createUploadMethods } from "./methods"

type UploadMethods = ReturnType<typeof createUploadMethods>

export type UploadEditor = {
  upload: UploadMethods & {
    client: Client
    onUploadImageFile: (hashUrl: string, file: File) => boolean
    onUploadFile: (hashUrl: string, file: File) => boolean
  }
}

export type UploadPluginCustomTypes = {
  Name: "upload"
  Editor: UploadEditor
}

export const UploadPlugin = ({ authToken }: { authToken?: string }) =>
  createPlugin<UploadPluginCustomTypes>((editor) => {
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
      },
    }
  })
