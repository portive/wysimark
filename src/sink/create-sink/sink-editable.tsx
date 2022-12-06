import { ReactElement } from "react"
import { RenderElementProps, RenderLeafProps } from "slate-react"

import { BasePluginCustomTypes, PluginObject } from "../types"

export type RenderElement = (
  x: RenderElementProps
) => JSX.Element | ReactElement | undefined

export function createRenderElementPlugins(
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  return plugins.filter((plugin) => plugin.editableProps?.renderElement)
}

export type RenderLeaf = (
  x: RenderLeafProps
) => JSX.Element | ReactElement | undefined

export function createRenderLeafPlugins(
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  return plugins.filter((plugin) => plugin.editableProps?.renderLeaf).reverse()
}
