import { Client, createClient } from "@portive/client"
import { Descendant } from "slate"

import { createPlugin, curry } from "~/src/sink"

import { createUploadMethods } from "./methods"
import { normalizeNode } from "./normalize-node"

type UploadMethods = ReturnType<typeof createUploadMethods>

export type UploadEditor = {
  upload: UploadMethods & {
    client: Client
    onUploadImageFile: () => boolean
    onUploadFile: () => boolean
  }
}

export type UploadElement = {
  type: "upload"
  children: Descendant[]
}

export type UploadPluginCustomTypes = {
  Name: "upload"
  Editor: UploadEditor
  Element: UploadElement
}

export const UploadPlugin = ({ authToken }: { authToken?: string }) =>
  createPlugin<UploadPluginCustomTypes>((editor) => {
    if (!authToken) {
      throw new Error(`You must provide an authToken`)
    }
    const client = createClient({ authToken })
    editor.upload = {
      client,
      onUploadImageFile: () => false,
      onUploadFile: () => false,
      ...createUploadMethods(editor),
    }
    return {
      name: "upload",
      editor: {
        normalizeNode: curry(normalizeNode, editor),
      },
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
