import { FunctionComponent, useContext } from "react"
import { UnknownRecord } from "type-fest/source/internal"

import { LayersContext } from "./layers"
import { Layer } from "./types"

export function useLayer<T extends Record<string, unknown>>(
  type: string,
  Component: FunctionComponent<T>
) {
  const { openLayer, closeLayer } = useContext(LayersContext)

  function open(props: T) {
    const layer = { type, Component, props } as Layer<UnknownRecord>
    openLayer(layer)
  }

  function close() {
    closeLayer(type)
  }

  return { open, close, type, Component }
}
