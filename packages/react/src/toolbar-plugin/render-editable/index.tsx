import { clsx } from "clsx"
import { useCallback, useRef } from "react"
import { Editor, Transforms } from "slate"
import { ReactEditor, useFocused, useSlateStatic } from "slate-react"

import { RenderEditableProps } from "~/src/sink"
import { Layers } from "~/src/use-layer"

import { Toolbar } from "../components"
import { $Editable, $OuterContainer } from "../styles"

export function renderEditable({ attributes, Editable }: RenderEditableProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null)

  const editor = useSlateStatic()
  const focused = useFocused()

  /**
   * When the user clicks inside the outer container but outside of the content
   * or the toolbar, we want the user to see the cursor inside the editable
   * region.
   */
  const onClickOuterContainer = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      /**
       * If the user clicked on the toolbar, we don't want to do anything.
       *
       * If the user clicked on the content, we don't want to do anything
       * because focus and selection will be handled by Slate.
       */
      if (e.target !== e.currentTarget) return
      /**
       * Select the last position in the editor
       */
      Transforms.select(editor, Editor.end(editor, []))
      ReactEditor.focus(editor)
    },
    [editor]
  )
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
      <$OuterContainer
        ref={outerContainerRef}
        className={clsx({ "--focused": focused })}
        style={{
          height: editor.toolbar.height,
          minHeight: editor.toolbar.minHeight,
          maxHeight: editor.toolbar.maxHeight,
        }}
        onClick={onClickOuterContainer}
      >
        <Toolbar />
        <Editable
          as={$Editable}
          {...attributes}
          style={{ overflowY: "auto" }}
        />
      </$OuterContainer>
    </Layers>
  )
}
