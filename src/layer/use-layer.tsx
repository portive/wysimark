import { FunctionComponent, useContext } from "react"
import { UnknownRecord } from "type-fest/source/internal"

import { LayersContext } from "./layers"
import { Layer } from "./types"

export function useLayer<T extends Record<string, unknown>>(
  type: string,
  Component: FunctionComponent<T>
) {
  const { setLayers } = useContext(LayersContext)

  /**
   * Open a layer
   */
  function open(props: T) {
    setLayers((layers) => {
      const layer = { type, Component, props } as Layer<UnknownRecord>
      return {
        ...layers,
        [type]: layer,
      }
    })
  }

  /**
   * Close a layer
   */
  function close() {
    setLayers((layers) => {
      const nextLayers = { ...layers }
      delete nextLayers[type]
      return nextLayers
    })
  }

  return { open, close, type, Component }
}
