import isHotkey from "is-hotkey"
import React from "react"
import styled from "@emotion/styled"
import { InputBox } from "./styles"

export const $Input = styled.input(InputBox)

const isEnter = isHotkey("enter")
const isModEnter = isHotkey("mod+enter")

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: (event: React.FormEvent<HTMLInputElement>) => void
}

export function Input({ onKeyDown, onSubmit, ...props }: InputProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (isEnter(e.nativeEvent) || isModEnter(e.nativeEvent)) {
      e.preventDefault()
      e.stopPropagation()
      if (onSubmit == null) return
      onSubmit(e as any)
    }
    if (onKeyDown == null) return
    onKeyDown(e as any)
  }
  return <$Input onKeyDown={handleKeyDown} {...props} />
}
