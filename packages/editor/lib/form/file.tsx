import React from "react"
import styled from "@emotion/styled"
import { $Button } from "./button"

const $Label = styled.label``

const $Input = styled.input`
  display: none;
`

const $DivButton = $Button.withComponent("div")

export function File({
  onChange,
  children,
}: {
  children: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <$Label>
      <$Input type="file" multiple onChange={onChange} />
      <$DivButton>{children}</$DivButton>
    </$Label>
  )
}
