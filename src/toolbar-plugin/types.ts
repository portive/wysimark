import { Editor } from "slate"

export type Item =
  | {
      icon: React.FunctionComponent
      title: string
      hotkey?: string
      action?: (editor: Editor) => void
      more?: boolean
      children?: Item[]
    }
  | "divider"
