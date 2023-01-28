import { MouseEvent, useCallback } from "react"

import { useLayer } from "~/src/use-layer"

import { Tooltip } from "./tooltip"
import { Triangle } from "./triangle"

/**
 * Takes a title and a hotkey and renders it as a tooltip.
 *
 * You'll notice that hotkey can be a function and the reason is very specific
 * to our needs which is that we don't know what the hotkey should look like
 * until we are in the browser (i.e. not the server) because it checks the user
 * agent to see if we are on a Mac or on Windows.
 *
 * We can defer this request until the tooltip is displayed.
 *
 * The editor currently has no need to display this hotkey shortcuts except in
 * things like tooltips so this isn't a problem for us. Potentially, we may need
 * to figure out a way to render this on the server or figure out a way to
 * render on the server without the hotkey and then fill it in when we are in
 * the browser.
 *
 * If we ever fix this requirement that hotkeys can only be shown in the browser
 * (i.e. we get server side rendering of hotkeys working) then `useTooltip` can
 * be simplified to not take a function.
 */
export function useTooltip(
  {
    title,
    hotkey,
  }: {
    title: string
    hotkey?: string | (() => string | undefined)
  },
  deps: React.DependencyList = []
) {
  const label = useLayer("tooltip-label")
  const triangle = useLayer("tooltip-triangle")

  /**
   * On hover over
   */
  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    const dest = e.currentTarget
    /**
     * Open tooltip
     */
    if (title !== undefined) {
      label.open(() => (
        <Tooltip
          title={title}
          hotkey={typeof hotkey === "function" ? hotkey() : hotkey}
          dest={dest}
        />
      ))
      triangle.open(() => <Triangle dest={dest} />)
    }
  }, deps)

  /**
   * On hover out
   */
  const onMouseLeave = useCallback(() => {
    label.close()
    triangle.close()
  }, deps)
  return { onMouseEnter, onMouseLeave }
}
