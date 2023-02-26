import "./button.css"

import React from "react"
import { useWysimark, Wysimark } from "wysimark"

type EditorProps = {
  value: string
  // /**
  //  * Is this the principal call to action on the page?
  //  */
  // primary?: boolean
  // /**
  //  * What background color to use
  //  */
  // backgroundColor?: string
  // /**
  //  * How large should the button be?
  //  */
  // size?: "small" | "medium" | "large"
  // /**
  //  * Button contents
  //  */
  // label: string
  // /**
  //  * Optional click handler
  //  */
  // onClick?: () => void
}

/**
 * I separated the editor here so that it can be re-rendered when the value
 * changes.
 */
export const InnerEditor = ({ value, ...props }: EditorProps) => {
  const wysimark = useWysimark({
    initialValue: value,
    ...props,
  })
  return <Wysimark wysimark={wysimark} />
}

/**
 * Primary UI component for user interaction
 */
export const Editor = ({ value = "# Hello World" }: EditorProps) => {
  return <InnerEditor key={value} value={value} />
}
