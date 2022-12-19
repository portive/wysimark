import { Dispatch, FunctionComponent, SetStateAction } from "react"

/**
 * Everything needed to render and identify a currently opened Layer.
 */
export type Layer = {
  /**
   * The `type` identifies the use case for the layer and is special in that
   * only one layer can be open for each type.
   *
   * For example, let's say a user opens a tooltip then opens another tooltip.
   * The first opened tooltip will automatically be closed. This reflects how
   * user interface usually work in that only one of each type of Layer can
   * be opened at a time but layers at different levels can be open at the same
   * time like a pop up form and a tooltip for a component in the popup form.
   *
   * Examples of different types are:
   *
   * - toolbar
   * - dialog box
   * - error box
   */
  type: string
  /**
   * The React Component (currently supported as only a FunctionComponent)
   * to render.
   */
  Component: FunctionComponent<Record<string, never>>
}

/**
 * A Lookup Record that contains all the currently opened Compnent objects.
 *
 * NOTE:
 *
 * The structure is designed such that only one Component object can exist at
 * any given key. The `key` represents the `type` of the Layer. So, for example,
 * only one "tooltip" type can be open at once.
 */
export type LayersRecord = Record<string, Layer>

/**
 * The value of the `LayersContext` that is passed around.
 *
 * NOTE:
 *
 * This is an implementation detail and wouldn't be used directly. Instead,
 * the interface to this library should be through the `useLayer` method.
 */
export type LayersContextValue = {
  layers: LayersRecord
  setLayers: Dispatch<SetStateAction<LayersRecord>>
  openLayer: (layer: Layer) => void
  closeLayer: (layerType: string) => void
}
