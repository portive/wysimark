import React, { cloneElement, useEffect } from "react"
import { BaseElement, Editor, NodeEntry, Path, Range } from "slate"
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useSlateStatic,
} from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { SinkEditor } from "../../types"
export { SinkReset } from "./styles"

/**
 * In Editable, we use the Slate context to grab the right things from
 * the editor.
 */
export function SinkEditable(originalProps: Parameters<typeof Editable>[0]) {
  const editor = useSlateStatic() as unknown as Editor & SinkEditor
  const { sink } = editor

  /**
   * We ask Slate to normalize the editor once at the very start.
   *
   * This is helpful for plugins that need to store some useful state in the
   * document and to add or fix certain parts of the document. Not all of
   * these values are stored in the saved documents.
   *
   * Some examples:
   *
   * - inserting collapsible paragraphs between void components. These should
   *   not be saved.
   *
   * - Add column and row indexes to help with rendering which should not
   *   be saved.
   *
   * Ideally, we wouldn't have to do any of this but pragmatically, it is
   * the most performant route.
   *
   * Once we normalize the document once, the document is kept up to date
   * through regular normalizing steps that are more performance because
   * they only check changed nodes.
   */
  useEffect(() => {
    Editor.normalize(editor, { force: true })
  }, [])

  /**
   * Create the substituted `decorate` method.
   *
   * With decorate, we are taking all the ranges from all the decorators and
   * combining them together, including the ranges created from the `decorate`
   * attribute on `SinkEditable`.
   */
  const decorate = (entry: NodeEntry): Range[] => {
    const ranges: Range[] = []
    for (const plugin of sink.pluginsFor.decorate) {
      const resultRanges = plugin.editableProps?.decorate?.(
        entry as [BaseElement, Path]
      )
      if (resultRanges === undefined) continue
      ranges.push(...resultRanges)
    }
    if (originalProps.decorate) {
      ranges.push(...originalProps.decorate(entry))
    }
    return ranges
  }

  /**
   * Create the substituted `renderElement` method.
   *
   * Generally, we are looking for the first result from any plugin or on
   * SinkEditable and return the first one that returns a value only.
   */
  const nextRenderElement = (renderElementProps: RenderElementProps) => {
    /**
     * Iterate over all the plugin `renderElement`. If they return nothing
     * then we go to the next one until we hit a result. If we don't hit a
     * result, then we go to the `renderElement` passed to the `SinkEditable`
     * component.
     */
    for (const plugin of sink.pluginsFor.renderElement) {
      const result = plugin.editableProps?.renderElement?.(renderElementProps)
      if (result) return result
    }
    if (originalProps.renderElement === undefined) {
      throw new Error(
        `Element with type ${renderElementProps.element.type} not handled. Note that renderElement is not defined on SinkEditable so this is only the result of checking the Sink Plugins.`
      )
    }
    return originalProps.renderElement(renderElementProps)
  }

  /**
   * Create the substituted `renderLeaf` method.
   *
   * Generally, we are looking for all the results from all the plugins and
   * SinkEditable and merge the results together by nesting the responses
   * starting from the first plugin on the outside to the `renderLeaf` method
   * on `SinkEditable` on the inside.
   */
  const nextRenderLeaf = (renderLeafProps: RenderLeafProps) => {
    if (originalProps.renderLeaf === undefined) {
      throw new Error(`renderLeaf was not defined on SinkEditable`)
    }
    let value = originalProps.renderLeaf({
      ...renderLeafProps,
      /**
       * We override this because `attributes` should only appear on the
       * uppermost leaf element if there are several nested ones and it's
       * possible that this won't be the uppermost leaf.
       *
       * We add attributes back on at the very end so no need to worry if
       * we omit it here.
       */
      attributes: {} as RenderLeafProps["attributes"],
    })
    for (const plugin of sink.pluginsFor.renderLeaf) {
      const possibleValue = plugin.editableProps?.renderLeaf?.({
        ...renderLeafProps,
        children: value,
      })
      if (possibleValue) {
        value = possibleValue
      }
    }
    value = cloneElement(value, renderLeafProps.attributes) //{ key: 'your-unique-key-here' })
    return value
  }

  /**
   * Iterate through all the plugins trying to handle the `onKeyDown`.
   * If it finds one (which is identified when the function returns `true`)
   * then we stop and return.
   *
   * If we don't find one, we follow through to the `onKeyDown` found in the
   * `SinkEditable` component.
   */
  const nextOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    for (const plugin of sink.pluginsFor.onKeyDown) {
      const result = plugin.editableProps?.onKeyDown?.(e)
      if (result) return
    }
    originalProps.onKeyDown?.(e)
  }

  const NextEditable = (props: EditableProps) => {
    /**
     * This creates the bottom-most RenderEditable which itself will only
     * take an `attributes` prop.
     *
     * Every RenderEditable in the chain
     */
    let CurrentRenderEditable = (props: EditableProps) => (
      <Editable {...props} />
    )
    for (const plugin of sink.pluginsFor.renderEditable) {
      /**
       * Assigns the CurrentRenderEditable as the previous one so that we can
       * have it available to call in the NextRenderEditable
       */
      const PrevRenderEditable = CurrentRenderEditable

      CurrentRenderEditable = (props: EditableProps) => {
        /**
         * TODO:
         *
         * This should probably be fixed in the actual types; however, we
         * know at this point that `renderEditable` is defined because we
         * filtered it in an earlier step.
         */
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return plugin.renderEditable!({
          attributes: props,
          Editable: PrevRenderEditable,
        })
      }

      //   CurrentEditable = function MyEditable({ attributes }) {
      //     return <PrevEditable attributes={attributes} Editable={PrevEditable} />
      //   }
    }
    return <CurrentRenderEditable {...props} />
  }

  return (
    // <Reset>
    <NextEditable
      {...originalProps}
      decorate={decorate}
      onKeyDown={nextOnKeyDown}
      renderElement={nextRenderElement}
      renderLeaf={nextRenderLeaf}
    />
    // </Reset>
  )
}
