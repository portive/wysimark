import { styled } from "goober"
import { forwardRef } from "react"

import { $Panel } from "./panel-styles"

export const $FileDialog = styled($Panel, forwardRef)`
  padding: 1em;
  width: 18em;
`
