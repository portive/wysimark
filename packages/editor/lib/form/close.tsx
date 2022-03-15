import React from "react"
import { ElementProps } from "~/lib/ts-utils"
import styled from "@emotion/styled"

const $Close = styled.div`
  color: #8b91a4;
  cursor: pointer;
  font-size: 30px;
  font-weight: 300;
  position: absolute;
  right: 32px;
  top: 24px;
  &:hover {
    color: black;
  }
`

export function Close(props: ElementProps<HTMLDivElement>) {
  return <$Close {...props}>&times;</$Close>
}
