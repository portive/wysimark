import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { RenderEditableProps } from "~/src/sink"
import { Layers } from "~/src/use-layer"

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
   *
   * TODO:
   *
   * We currently add `Layers` around everything in the Toolbar plugin but
   * we should consider adding this somewhere else because the layers inside
   * the Editor (like in the image toolbar) won't work unless we are using the
   * toolbar plugin.
   *
   * Conceivably, we could have a version of the editor without the Toolbar.
   *
   * We could consider adding a Layers plugin and make it a dependency of some
   * other thing or we could just add it outside of everything as part of
   * Sink itself since probably every version of the editor will require at
   * least one layer somewhere.
   */
  return (
    <Layers>
      <$OuterContainer className={clsx({ "--focused": focused })}>
        <Toolbar />
        <Editable as={$Editable} {...attributes} />
      </$OuterContainer>
    </Layers>
  )
}
