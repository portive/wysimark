import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

import { create__VarName__Methods } from "./methods"
import { normalizeNode } from "./normalize-node"

type __VarName__Methods = ReturnType<typeof create__VarName__Methods>

export type __VarName__Editor = {
  __varName__: __VarName__Methods
}

export type __VarName__Element = {
  type: "__var-name__"
  children: Descendant[]
}

export type __VarName__PluginCustomTypes = {
  Name: "__var-name__"
  Editor: __VarName__Editor
  Element: __VarName__Element
}

export const __VarName__Plugin = () =>
  /* fails type until you add it to CustomTypes. Then remove this comment. */
  // @ts-ignore
  createPlugin<__VarName__PluginCustomTypes>((editor) => {
    editor.__varName__ = create__VarName__Methods(editor)
    return {
      name: "__var-name__",
      editor: {
        normalizeNode,
      },
      editableProps: {},
    }
  })
