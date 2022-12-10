import { styled } from "goober"
import { forwardRef } from "react"
import { Editable } from "slate-react"

export const $Editable = styled(Editable, forwardRef)`
  padding: 2em;
  border: 1px solid silver;
  border-radius: 0.5em;
  margin: 4em;
  font: 16px arial;
  max-width: 640px;
`
