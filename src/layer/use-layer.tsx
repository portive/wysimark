import { FunctionComponent, useContext } from "react"

import { LayersContext } from "./layers"
import { Layer } from "./types"

/**
 * `useLayer` may only be called when it is inside a Component that is itself
 * nested under the `Layers` component. This is necessary because `useLayer`
 * uses a React Context which is set up in the `Layers` component.
 *
 * Using the `useLayer` hook returns a layer object that has an `open` and
 * `close` method. You can use it something like this:
 *
 * ```typescript
 * function MyComponent() {
 *
 *   const tooltip = useLayer('tooltip')
 *
 *   const openTootlip = () => {
 *     tooltip.open(() => <Tooltip title="Hey Dudes" />)
 *   }
 *
 *   return <div
 *     onMouseEnter={openTooltip}
 *     onMouseLeave={tooltip.close}
 *   >Thing that needs a tooltip</div>
 * }
 * ```
 *
 * In this scenario, it opens a `Tooltip` component when the mouse enters the
 * div and closes it when the mouse leave it.
 *
 * This library is simple but flexible enough to be used to handle different
 * kinds of components that pop up in the DOM.
 *
 * - tooltips
 * - dialog boxes positioned where a button is clicked
 * - dialog boxes positioned in the center of a viewport
 * - notifications
 *
 * `useLayer` is designed to handle just the opening and closing of the layers
 * that overlays on top of all the other components at the top of the DOM.
 *
 * It also ensures only one of each kind of layer is open at a time. So when
 * a second tooltip is opened, the first is closed.
 *
 * The positioning of the tooltips, dialogs and notifications, especially when
 * the position is relative to another element like a button that was clicked
 * it the domain of the `useReposition` micro library.
 *
 * These libraries are not tied together in any way (there is nothing
 * opinionated that ties them toegher); however they were designed and built
 * at the same time and work together well to solve all the issues related to
 * popup windows/dialogs/tooltips of any kind.
 */
export function useLayer(type: string) {
  const { openLayer, closeLayer, layers } = useContext(LayersContext)

  /**
   * Call this method to open a layer that contains the Component at the given
   * layer type.
   *
   * Opening a layer of this type will close any other layers of this type.
   * For example, if a `tooltip` layer was currently open, opening a new
   * tooltip would close the previously open one.
   *
   * When opening a layer, we pass in a function (that takes no arguments) and
   * returns our rendered Component something like:
   *
   * ```ts
   * const dialog = useLayer('dialog')
   *
   * const openDialog = () => {
   *   dialog.open(() => <MyDialog title="My Title" />)
   * }
   * ```
   *
   * If you are getting TypeScript issues, especially when passing props as
   * properties of some other object, the easiest way to fix these issues are
   * to assign those values to a `const` first. This can happen when the
   * values on the object could potentially be `undefined` or change during
   * a re-render.
   *
   * For example, this could give typing issues:
   *
   * ```ts
   * type Item = {
   *   title?: string
   * }
   *
   * const dialog = useLayer('dialog')
   *
   * const openDialog = () => {
   *   if (item.title === undefined) return
   *   dialog.open(() => <MyDialog title={item.title} />)
   * }
   * ```
   *
   * It's a little non-obvious because it looks like we did a check to make
   * sure that `item.title` is defined. But remember that it could change
   * during a re-render.
   *
   * Here's how to fix this.
   *
   * ```ts
   * type Item = {
   *   title?: string
   * }
   *
   * const dialog = useLayer('dialog')
   *
   * const openDialog = () => {
   *   if (item.title === undefined) return
   *   const title = item.title
   *   dialog.open(() => <MyDialog title={title} />)
   * }
   * ```
   *
   * Now `title` is of type `string` because we already asserted that
   * `item.title` was a string. We assigned it to a `const` meaning that it
   * won't change, even if re-rendered later.
   */
  function open(Component: FunctionComponent<Record<string, never>>) {
    const layer: Layer = { type, Component }
    openLayer(layer)
  }

  /**
   * Call this method to close the current layer of the given layer type.
   */
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
