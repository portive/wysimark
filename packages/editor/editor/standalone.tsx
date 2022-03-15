import PropTypes from "prop-types"
import React, { useImperativeHandle } from "react"
import ReactDOM from "react-dom"
import { Editor } from "slate"
import { UploadOptions, UseEditorProps } from "./types"
import { EditorEvent } from "./types/editor-event"
import { Wysimark as __Wysimark__, useEditor } from "."

export type { OnChange } from "./types"

type WysimarkProps = Omit<Parameters<typeof __Wysimark__>[0], "editor">

const WysimarkStandalone = React.forwardRef<
  Editor, // ref type
  UseEditorProps & WysimarkProps // props type
>(function WysimarkStandalone(props, ref) {
  const editor = useEditor({
    initialMarkdown: props.initialMarkdown,
    upload: props.upload,
  })

  useImperativeHandle(ref, () => editor, [editor])

  return (
    <__Wysimark__
      editor={editor}
      onChange={props.onChange}
      onUpdate={props.onUpdate}
      onBlur={props.onBlur}
      throttle={props.throttle}
      showInitial={false}
      minHeight={props.minHeight}
      maxHeight={props.maxHeight}
    />
  )
})

WysimarkStandalone.propTypes = {
  initialMarkdown: PropTypes.string.isRequired,
  upload: PropTypes.object as React.Validator<UploadOptions>,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  onBlur: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  throttle: PropTypes.number,
}

/**
 * When `createWysimark` is used to create an Editor, it returns this
 * `WysimarkController` object which allows access to the editor, the markdown
 * and the ability to unmount the Editor from the DOM cleanly.
 */

type WysimarkController = { unmount: () => void } & EditorEvent

/**
 * This method is the primary entry point to create a standalone editor.
 *
 * Call this method with the `containerElement` and a set of props for
 * Wysimark and the Editor will be rendered as the child of the `containerElement`.
 *
 * The method will also return a `WysimarkController` object which acan be
 * used to unmount the Editor from the DOM for cleanup. It also exposes methods
 * like `getMarkdown` and `getEditor`
 */

export function createWysimark(
  el: HTMLElement,
  props: UseEditorProps & WysimarkProps
): WysimarkController {
  const ref = React.createRef<Editor>()
  const reactElement = React.createElement(WysimarkStandalone, {
    ...props,
    ref,
  })
  /**
   * HINT:
   *
   * We render to the target `reactContainer` which is defined using
   * the `ref` property on the `div` in the `<template>` of the component.
   */
  ReactDOM.render(reactElement, el)

  function getEditor() {
    return ref.current
  }

  function getMarkdown() {
    return ref.current ? ref.current.getMarkdown() : props.initialMarkdown
  }

  function getData() {
    return { markdown: getMarkdown() }
  }

  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(el)
    },
    getEditor,
    getMarkdown,
    getData,
  }
}
