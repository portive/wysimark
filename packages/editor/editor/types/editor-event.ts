import { Editor } from "slate"

/**
 * T
 */
export type EditorEvent = {
  /**
   * Do not change to `editor`.
   *
   * We use `getEditor` because in some scenarios, we only have a ref to the
   * editor. We need to use the `getEditor` method so that we can dereference
   * the `editor` from the `ref`.
   *
   * A notable place where this happens is the return value of
   * `editor/standalone`.
   */
  getEditor: () => Editor | null
  getMarkdown: () => string
  getData: () => { markdown: string }
}
