import cx from "classnames"
import React from "react"
import { useFocused, useSlateStatic } from "slate-react"
import { colors } from "~/editor/colors"
import { CustomEditable } from "~/editor/editable/custom-editable"
import { EditorToolbar } from "~/editor/toolbar"
import { WysimarkContainerProps } from "~/editor/types"
import { useInitialClassName } from "~/lib/use-initial"
import styled from "@emotion/styled"

/**
 * We split off the render into its own Component so that we have access to
 * the `useFocused` hook.
 */
export function Container({
  "data-cy": dataCy,
  showInitial = false,
  minHeight = 240,
  maxHeight,
  onBlur,
}: WysimarkContainerProps & { onBlur: React.FocusEventHandler }) {
  const isFocused = useFocused()
  const editor = useSlateStatic()

  /**
   * On the first render, if `showInitial` is true, it will quickly set the
   * className to the first argument and then remove it.
   *
   * This is used to fade in the content after the initial render and makes
   * the first render less jarring when used with the lazy loading
   * `externalModule`.
   */
  const initialContentClassName = useInitialClassName(
    "--initial-editor-content",
    showInitial
  )

  /**
   * Use different CSS styling when a maxHeight is provided.
   */
  const className = cx(initialContentClassName, {
    "--focused": isFocused,
  })

  /**
   * Min height is always specified and a max height is optional.
   *
   * When max height is not specified, HTML says that it defaults to `none`
   * which is what we want.
   */
  const style = { minHeight, maxHeight }

  return (
    <$OuterEditorContainer className={className}>
      <EditorToolbar />
      <$InnerEditorContainer ref={editor.containerRef} style={style}>
        <CustomEditable
          className="wysimark-body"
          data-cy={dataCy}
          readOnly={false}
          onBlur={onBlur}
        />
      </$InnerEditorContainer>
    </$OuterEditorContainer>
  )
}

const $OuterEditorContainer = styled.div`
  position: relative;
  border: 1px solid ${colors.editorBorderColor};
  border-radius: ${colors.editorBorderRadius};

  /**
   * Fade a nice blue border on a focus or blur
   */
  transition: border ${colors.editorBorderTransition},
    box-shadow ${colors.editorBorderTransition};
  &.--focused {
    border: 1px solid ${colors.highlight};
    box-shadow: ${colors.highlight} 0 0 0 1px;
  }
`

/**
 * Style the container that surrounds the Toolbar and the Editable Content
 * area.
 */

const $InnerEditorContainer = styled.div`
  border-radius: ${colors.editorBorderRadius};

  /**
   * This forces the inner Editable div to expand to fill the space in the
   * container which is important so that when we click on the empty part
   * of the content area, it triggers an onClick event which will focus
   * the editor and position the selection.
   *
   * This won't happen if the Editable is only at the top part of the container.
   *
   * IMPORTANT:
   *
   * This works in conjunction with styled-editable.ts which provides the
   * flex styling for the Editable.
   */
  display: flex;
  flex-direction: column;
`
