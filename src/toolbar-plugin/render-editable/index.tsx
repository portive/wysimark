import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { RenderEditableProps } from "~/src/sink"

import { Toolbar } from "../components"
import { $Editable, $OuterContainer } from "../styles"

export function renderEditable({ attributes, Editable }: RenderEditableProps) {
  const focused = useFocused()
  /**
   * The Toolbar works by rendering an $OuterContainer which is the border
   * around the entire editor.
   *
   * Inside the $OuterContainer, we have our actual Toolbar and the
   * actual Editable.
   */
  return (
    <$OuterContainer className={clsx({ "--focused": focused })}>
      <Toolbar />
      <Editable as={$Editable} {...attributes} />
    </$OuterContainer>
  )
}
