import { createContext, useState } from "react"

import { Portal } from "./portal"
import { LayersContextValue, LayersRecord } from "./types"

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

/**
 * The LayersProvider should be wrapped around the Component or Components for
 * which you want to have layer support.
 *
 * The `useLayer` hook can only be used inside a `LayersProvider`.
 *
 * It provides these necessary functions:
 *
 * - Makes available to its children access to `layers` and `setLayers`
 *   which are used to modify the current state of which layers are open.
 *
 * - Renders the currently open `layers` to the DOM at the top level of the
 *   DOM. We do this to simplify positioning as we can position everything
 *   relative to the full window which is what is returned by
 *   `getBoundingClientRect`
 *
 */
export function Layers({ children }: { children: React.ReactNode }) {
  const [layers, setLayers] = useState<LayersRecord>({})
  return (
    <LayersContext.Provider value={{ layers, setLayers }}>
      {children}
      {Object.entries(layers).map(([, layer]) => {
        return (
          <Portal key={layer.type}>
            <layer.Component {...layer.props} />
          </Portal>
        )
      })}
    </LayersContext.Provider>
  )
}
