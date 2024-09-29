import { Descendant } from "slate"

import { createPlugin, curryOne } from "~/src/sink"

import { TypedPlugin } from "../sink/types/plugin/plugin"
import { createClipMethods } from "./methods"
import { normalizeNode } from "./normalize-node"

type ClipMethods = ReturnType<typeof createClipMethods>

export type ClipEditor = {
  clip: ClipMethods
}

/**
 * is void
 */
export type ClipItemClosedElement = {
  type: "clip-item-closed"
  id: string
  hash: string
  content: string
  children: Descendant[]
}

/**
 * is not void
 */
export type ClipItemOpenElement = {
  type: "clip-item-open"
  id: string
  hash: string
  content: string
  children: Descendant[]
}

export type ClipContainerElement = {
  type: "clip-container"
  children: Descendant[]
}

export type ClipPluginCustomTypes = {
  Name: "clip"
  Editor: ClipEditor
  Element: ClipContainerElement | ClipItemOpenElement | ClipItemClosedElement
}

export const ClipPlugin = createPlugin<ClipPluginCustomTypes>(
  (editor, options, { createPolicy }) => {
    editor.clip = createClipMethods(editor)
    return createPolicy({
      name: "clip",
      editor: {
        isInline(element) {
          if (["clip-item-open", "clip-item-closed"].includes(element.type))
            return true
        },
        isVoid(element) {
          if (element.type === "clip-container") return true
          if (element.type === "clip-item-closed") return true
        },
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        renderElement({ element, attributes, children }) {
          switch (element.type) {
            case "clip-container":
              return <div {...attributes}>{children}</div>
            case "clip-item-open":
              return <div {...attributes}>{children}</div>
            case "clip-item-closed":
              return <div {...attributes}>{children}</div>
          }
        },
      },
    })
  }
) as TypedPlugin<ClipPluginCustomTypes>
