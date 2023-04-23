import { Descendant } from "slate"

export type WysimarkEditor = {
  /**
   * Private state for the wysimark editor.
   */
  wysimark: {
    initialMarkdown: string
    initialValue: Descendant[]
  }
  /**
   * Public methods for the wysimark editor.
   */
  getMarkdown: () => string
  resetMarkdown: (markdown: string) => void
}
