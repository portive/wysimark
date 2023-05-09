import { FunctionComponent } from "react"
import { Editor } from "slate"

export type Item =
  | {
      /**
       * Icon to show as a part of the button.
       */
      icon: React.FunctionComponent
      /**
       * Title to show as a part of the tooltip.
       */
      title: string
      /**
       * Hotkey to show as a part of the toolip.
       * This does not create the actual hotkey.
       */
      hotkey?: string
      /**
       * Method to execute when the button is clicked
       */
      action?: (editor: Editor) => void
      /**
       * If the button should be shown or not. If the argument is not provided,
       * the button will be shown.
       *
       * NOTE: This only works in top-level items at the moment.
       */
      show?: (editor: Editor) => boolean
      /**
       * If `true`, the button will display as downward create next to it to
       * indicate that clicking it will display some more options.
       * Typically this value is set to true when it has `children` or a
       * `Component` prop; however, we allow it to be set manually.
       */
      more?: boolean
      children?: Item[]
      Component?: FunctionComponent<{ dest: HTMLElement; close: () => void }>
    }
  | "divider"
