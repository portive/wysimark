import { Editable } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"
import { defined } from "./utils"

type EditableType = (editableProps: EditableProps) => JSX.Element

/**
 * Create the substituted `decorate` method.
 *
 * With decorate, we are taking all the ranges from all the decorators and
 * combining them together, including the ranges created from the `decorate`
 * attribute on `SinkEditable`.
 */
export function createEditable(
  plugins: BasePluginPolicy[]
): NonNullable<EditableType> {
  const fns = plugins.map((plugin) => plugin.renderEditable).filter(defined)
  return function SinkEditable(props) {
    /**
     * This creates the bottom-most RenderEditable which itself will only
     * take an `attributes` prop.
     *
     * Every RenderEditable in the chain
     */
    let CurrentRenderEditable = (props: EditableProps) => (
      <Editable {...props} />
    )
    for (const fn of fns) {
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
        return fn({
          attributes: props,
          Editable: PrevRenderEditable,
        })
      }
    }
    return <CurrentRenderEditable {...props} />
  }
}
