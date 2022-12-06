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

export function createRenderLeaf(
  pluginObjects: PluginObject<BasePluginCustomTypes>[]
) {
  const renderLeaves: RenderLeaf[] = []
  for (const plugin of pluginObjects) {
    const renderLeaf = plugin.editableProps?.renderLeaf
    if (renderLeaf) {
      renderLeaves.push(renderLeaf)
    }
  }
  return renderLeaves
}
