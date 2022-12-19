import { createContext, useState } from "react"

import { Portal } from "./portal"
import { Layer, LayersContextValue, LayersRecord } from "./types"

/**
 * Wrap this around the Component in which you want to have the ability to
 * display one or more layers at once.
 */
export const LayersContext = createContext<LayersContextValue>(
  /**
   * This is set to an invalid value and then typecast as the correct type.
   *
   * This is okay though because in `LayersProvider` we set the value to the
   * proper type before they are used for the first time.
   */
  {} as LayersContextValue
)

export const LayerContext = createContext<Layer>({} as Layer)

/**
 * The `Layers` Component should be wrapped around the Component or Components
 * which you want to have layer support.
 *
 * The `useLayer` hook must be called inside a `Layers` Component.
 *
 * It provides these necessary functions:
 *
 * - Makes available the resources necessary to open and close layers.
 *
 * - Renders the currently open layers to the DOM at the top level of the
 *   DOM. We do this to simplify positioning as we can position everything
 *   relative to the full window which is what is returned by
 *   `getBoundingClientRect`
 *
 * NOTE:
 *
 * As a design decision, we wrap many components with the Layer instead of
 * having a Layer per component. This design decision is important because
 * we may want to open multiple layers of the same type and if we open another
 * layer of the same type, we want any other layers to close.
 *
 * For example, consider a Dialog. If we open a differnet Dialog, we want the
 * first one to close. This can only be done when a single component knows
 * about the existence of both.
 */
export function Layers({ children }: { children: React.ReactNode }) {
  const [layers, setLayers] = useState<LayersRecord>({})

  /**
   * Open a layer of the given type
   */
  function openLayer(layer: Layer) {
    setLayers((layers) => {
      return {
        ...layers,
        [layer.type]: layer,
      }
    })
  }

  /**
   * Close a layer of the given type
   */
  function closeLayer(layerType: string) {
    setLayers((layers) => {
      const nextLayers = { ...layers }
      delete nextLayers[layerType]
      return nextLayers
    })
  }

  /**
   * - provide the layers context
   * - render the layers at the top of the DOM using a Portal
   */
  return (
    <LayersContext.Provider
      value={{ layers, setLayers, openLayer, closeLayer }}
    >
      {children}
      {Object.entries(layers).map(([, layer]) => {
        return (
          <Portal key={layer.type}>
            <LayerContext.Provider value={layer}>
              <layer.Component />
            </LayerContext.Provider>
          </Portal>
        )
      })}
    </LayersContext.Provider>
  )
}
