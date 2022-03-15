import React from "react"
import extraScopePlugin from "stylis-plugin-extra-scope"
import createCache from "@emotion/cache"
import { CacheProvider, Global } from "@emotion/core"
import { resetCss } from "./reset-css"

/**
 * This modifies emotion to prefix everything.
 *
 * Using instructions from here:
 * <https://stackoverflow.com/questions/60567233/how-to-move-global-styles-into-a-scope-for-emotion>
 *
 * Which uses this Stylis plugin:
 * <https://github.com/Andarist/stylis-plugin-extra-scope>
 */

const cache = createCache({
  stylisPlugins: [extraScopePlugin(".wm-reset-1.wm-reset-2.wm-reset-3")],
})

export function Reset({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={resetCss} />
      <CacheProvider value={cache}>
        <div className="wm-reset-1 wm-reset-2 wm-reset-3">{children}</div>
      </CacheProvider>
    </>
  )
}

export function ResetContainer({ children }: { children: React.ReactNode }) {
  return <div className="wm-reset-1 wm-reset-2 wm-reset-3">{children}</div>
}
