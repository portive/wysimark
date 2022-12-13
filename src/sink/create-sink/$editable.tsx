import { styled } from "goober"
import { forwardRef } from "react"
import { Editable } from "slate-react"

export const $Editable = styled(Editable, forwardRef)`
  padding: 2em;
  border: 2px solid rgb(203 213 225); /* slate-300 */
  border-radius: 0.5em;
  margin: 4em;
  font: 16px arial;
  max-width: 640px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: rgb(39 39 42); /* slate-800 */
`
