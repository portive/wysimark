import { Editor } from "slate"
import { EditorEvent } from "./editor-event"

/**
 * All these types are associated with the `Wysimark` component that make up the
 * editor. This includes `<ModalProvider />`, `<Slate />`, the `<EditorToolbar />`,
 * `<Editable />` and various styled components.
 */

/**
 * OnChange callback
 */
export type OnChange = (event: EditorEvent) => void

/**
 * These props are the subset of all the `WysimarkProps` that will be passed
 * to the <Slate /> component either directly as a prop, or indirectly through
 * a callback that is attached to `Slate`.
 */
export type WysimarkSlateProps = {
  editor: Editor
  onChange?: OnChange
  onUpdate?: OnChange
  throttle?: number
}

/**
 * Props that are passed into the Wysimark component except for those that
 * are part of `WysimarkSlateProps` above.
 */
export type WysimarkContainerProps = {
  "data-cy"?: string
  showInitial?: boolean
  minHeight?: number
  maxHeight?: number
  onBlur?: OnChange
}
