import { FunctionComponent, useContext } from "react"
import { UnknownRecord } from "type-fest/source/internal"

import { LayersContext } from "./layers"
import { Layer } from "./types"

export function useLayer<T extends Record<string, unknown>>(
  type: string,
  Component: FunctionComponent<T>
) {
  const { layers, setLayers } = useContext(LayersContext)

  /**
   * Open a layer
   */
  function open(props: T) {
    const layer = { type, Component, props } as Layer<UnknownRecord>
    setLayers({
      ...layers,
      [type]: layer,
    })
  }

  /**
   * Close a layer
   */
  function close() {
    const nextLayers = { ...layers }
    delete nextLayers[type]
    setLayers(nextLayers)
  }

  return { open, close, type, Component }
}
