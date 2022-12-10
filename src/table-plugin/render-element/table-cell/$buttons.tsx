import { styled } from "goober"
import { forwardRef } from "react"

import { MinusIcon, PlusIcon } from "../../icons"

export const $AddButton = styled(PlusIcon, forwardRef)`
  position: absolute;
  font-size: 1.5em;
  color: #c0c0c0;
  cursor: pointer;
  &:hover {
    color: royalblue;
  }
`

export const $RemoveButton = styled(MinusIcon, forwardRef)`
  position: absolute;
  font-size: 1.5em;
  color: #c0c0c0;
  cursor: pointer;
  &:hover {
    color: firebrick;
  }
`
