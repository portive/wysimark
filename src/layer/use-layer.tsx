import { FunctionComponent, useContext } from "react"

import { LayersContext } from "./layers"
import { Layer } from "./types"

export function useLayer(type: string) {
  const { openLayer, closeLayer, layers } = useContext(LayersContext)

  function open(Component: FunctionComponent<Record<string, never>>) {
    const layer: Layer = { type, Component }
    openLayer(layer)
  }

  function close() {
    closeLayer(type)
  }

  return {
    open,
    close,
    layer: layers[type],
    type,
  }
}
