import React from "react"
import { ElementProps } from "~/lib/ts-utils"
import styled from "@emotion/styled"
import { Fault } from "./fault"
import { Hint } from "./hint"
import { Label } from "./label"

const $Block = styled.div`
  margin: 18px 32px;
  &:first-of-type {
    margin-top: 0;
    margin-bottom: 30px;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  &.--align-right {
    text-align: right;
  }
  &.--divider-bottom {
    border-bottom: 1px solid silver;
  }
  p {
    line-height: 1.5em;
    margin-bottom: 1em;
  }
`

type BlockProps = ElementProps<HTMLDivElement> & {
  fault?: React.ReactNode // later fix this to not accept null
  hint?: React.ReactNode
  label?: React.ReactNode
}

export function Block({ children, fault, hint, label, ...props }: BlockProps) {
  return (
    <$Block {...props}>
      {label ? <Label>{label}</Label> : null}
      {children}
      {fault ? <Fault>{fault}</Fault> : null}
      {hint ? <Hint>{hint}</Hint> : null}
    </$Block>
  )
}
