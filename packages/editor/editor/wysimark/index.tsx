import lodashThrottle from "lodash/throttle"
import PropTypes from "prop-types"
import React, { useCallback, useState } from "react"
import ReactDOM from "react-dom"
import { Descendant } from "slate"
import { Slate } from "slate-react"
import { parse } from "~/lib/convert/parse"
import { ModalProvider } from "~/lib/modal"
import { Reset } from "~/lib/reset"
import { getEditorEvent } from "../event/get-editor-event"
import { Container } from "../render/render-editor/editor-with-toolbar"
import { WysimarkContainerProps, WysimarkSlateProps } from "../types"
import { EditorEvent } from "../types/editor-event"

/**
 * TODO: Remove PropTypes from React after adding to vue and standalone build
 *
 * Currently, PropTypes is not automatically being added as a dependency for
 * the standalone build and the Vue build. There are two ways we can probably
 * add it:
 *
 * 1. Manually add somewhere in the build process. Just declare that PropTypes
 *    is a needed dependency for those two builds and add it.
 * 2. Add the correct PropTypes to this file. This will add PropTypes as a
 *    dependency here which will carry over into Standalone and Vue.
 * 3. The "proper" way but probably overkill is to run a dependency check on
 *    Standalone and Vue separately, and they will automaticaly discover their
 *    own dependencies. The benefit of this is that if the Standalone or Vue
 *    build ends up having other dependencies not required in the React build,
 *    the build process will automatically figure it out.
 */
export { PropTypes }

function noop() {
  /* noop */
}

/**
 * Main Entry Point for Wysimark
 */
export const Wysimark = function ({
  editor,
  onChange: onChangeProp = noop,
  onUpdate: onUpdateProp = noop,
  onBlur: onBlurProp = noop,
  throttle = 1000,
  ...renderWysimarkProps
}: WysimarkSlateProps & WysimarkContainerProps) {
  /**
   * `value` state used to keep all of the content in the editor.
   */
  const [value, setValue] = useState<Descendant[]>(() => {
    const initialValue = parse(editor.initialMarkdown)
    /**
     * We set the `lastValue` here because if we don't, when we click into the
     * editor, the editor gets a call to `onChange` (for the selection change)
     * and because `lastValue` hasn't been set yet, we will get an `onChange`
     * called when there has been no change to the value.
     *
     * Notice in the `onChange` code that we check for a change by looking at
     * the `editor.lastValue`.
     */
    editor.lastValue = initialValue
    return initialValue
  })

  /**
   * This is a throttled version of onUpdate. It is defined such that if
   * `onUpdateProp` is `undefined`, then `onUpdate` is just a `noop`. This is
   * done mostly just to satisfy typing so it can be used inside the `onChange`
   * callback without an `if` statement.
   */
  const onUpdate = useCallback(
    lodashThrottle(
      (e: EditorEvent) => {
        onUpdateProp(e)
      },
      throttle,
      /**
       * We don't ant a call to the function on the leading edge which would
       * always just be one character change. We do want to ensure that the
       * trailing edge always gets an update though.
       */
      { leading: false, trailing: true }
    ),
    [onUpdateProp]
  )

  /**
   * Callback to set the editor value which is passed into `Slate` component.
   */
  const onChange = useCallback(
    (value: Descendant[]) => {
      /**
       * Sets the current editor value both as `useState` state and using a
       * `valueRef`. The `valueRef` is necessary for use with the `getMarkdown`
       * callback method.
       */
      if (value !== editor.lastValue) {
        setValue(value)
        const editorEvent = getEditorEvent(editor)
        onUpdate(editorEvent)
        onChangeProp(editorEvent)
        editor.lastValue = value
      }
    },
    [editor, onUpdate]
  )

  /**
   * When we lose focus from the `contentEditable` we want to call both
   * `onUpdate` and `onBlur`. This is because if we don't call `onUpdate`,
   * a developer depending on that for updating a value, may not get the
   * editor update until it is too late if the user clicks a button to save
   * too fast.
   *
   * Unfortunately, this won't work if the developer has added a save shortcut
   * key since the editor will not have been updated.
   *
   * Note that `onUpdate` may be called unnecessarily though but that shouldn't
   * be a big deal.
   */
  const onBlur = useCallback(() => {
    const e = getEditorEvent(editor)
    /**
     * TODO: `onUpdate.cancel` seems to work everywhere except in Vue. Figure out why and fix it.
     *
     * Prevent onUpdate from being called twice.
     */
    onUpdate.cancel()
    onUpdateProp(e)
    onBlurProp(e)
  }, [editor, onUpdate])

  return (
    <Reset>
      {/* Looking for CSS styles? Look in `editable` */}
      {/* ModalProvider for Context to show dialog boxes */}
      <ModalProvider>
        <Slate editor={editor} value={value} onChange={onChange}>
          <Container {...renderWysimarkProps} onBlur={onBlur} />
        </Slate>
      </ModalProvider>
    </Reset>
  )
}

/**
 * This TypeScript type is used by `lib/external-module` so that it is
 * aware of what is being exported from here.
 *
 * We export `React` and `ReactDOM` here as well so that Wysimark can be used
 * standalone (i.e. without having to have React installed). This can be
 * useful for delivery in a IIFE such as in Vue or used in standalone mode like
 * with jQuery or plain old JavaScript.
 */
export type WysimarkModule = {
  Wysimark: typeof Wysimark
  React: typeof React
  ReactDOM: typeof ReactDOM
}

/**
 * Export `React` and `ReactDOM` used when building a package for a framework
 * that is not React (e.g. Vue or Angular)
 */
export { React, ReactDOM }
