import { ReactElement } from "react"
import { RenderElementProps, RenderLeafProps } from "slate-react"

import { BasePluginCustomTypes, PluginObject } from "../types"

export type RenderElement = (
  x: RenderElementProps
) => JSX.Element | ReactElement | undefined

export function createRenderElements(
  pluginObjects: PluginObject<BasePluginCustomTypes>[]
) {
  const renderElements: RenderElement[] = []
  for (const plugin of pluginObjects) {
    const renderElement = plugin.editableProps?.renderElement
    if (renderElement) {
      renderElements.push(renderElement)
    }
  }
  return renderElements
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
