import { styled } from "goober"
import { forwardRef } from "react"
import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

export type ___Editor = {
  ___: true
}

export type ___Element = {
  type: "___"
  href: string
  children: Descendant[]
}

export type ___PluginCustomTypes = {
  Name: "___"
  Editor: ___Editor
  Element: ___Element
}

const $___ = styled("div", forwardRef)``

export const AnchorPlugin = () =>
  createPlugin<___PluginCustomTypes>((editor) => {
    return {
      name: "___",
      editor: {},
      editableProps: {},
    }
  })
