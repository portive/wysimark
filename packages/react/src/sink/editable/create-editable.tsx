import { Editable } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"
import { defined } from "./utils"

type EditableType = (editableProps: EditableProps) => JSX.Element

/**
 * create a new Editable component that takes all the `renderEditable` functions
 * which are components and have them wrap around the original Editable component.
 */
export function createEditable(
  plugins: BasePluginPolicy[]
): NonNullable<EditableType> {
  const fns = plugins.map((plugin) => plugin.renderEditable).filter(defined)

  /**
   * This creates the inner-most RenderEditable.
   */
  let CurrentRenderEditable = (props: EditableProps) => <Editable {...props} />
  /**
   * We iterate through all the `renderEditable` functions and wrap them
   * around the next inner-most `renderEditable`.
   */
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

  return CurrentRenderEditable

  // return function SinkEditable(props) {
  // /**
  //  * This creates the inner-most RenderEditable.
  //  */
  // let CurrentRenderEditable = (props: EditableProps) => (
  //   <Editable {...props} />
  // )
  // /**
  //  * We iterate through all the `renderEditable` functions and wrap them
  //  * around the next inner-most `renderEditable`.
  //  */
  // for (const fn of fns) {
  //   /**
  //    * Assigns the CurrentRenderEditable as the previous one so that we can
  //    * have it available to call in the NextRenderEditable
  //    */
  //   const PrevRenderEditable = CurrentRenderEditable
  //   CurrentRenderEditable = (props: EditableProps) => {
  //     /**
  //      * TODO:
  //      *
  //      * This should probably be fixed in the actual types; however, we
  //      * know at this point that `renderEditable` is defined because we
  //      * filtered it in an earlier step.
  //      */
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     return fn({
  //       attributes: props,
  //       Editable: PrevRenderEditable,
  //     })
  //   }
  // }
  // return <CurrentRenderEditable {...props} />
  // }
}
