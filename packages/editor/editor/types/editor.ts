import { BaseEditor, Descendant, Range } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"
import { Simplify } from "type-fest"
import { SecretAPIUploadProps } from "@wysimark/resource"
/**
 * IMPORTANT!
 *
 * Import from `~/lib/modal` must use `../../lib/modal` because the build
 * step in rollup can't read the `~` and translate it properly.
 */
import { UseModalReturnType } from "../../lib/modal" // must be relative for build step of types to work. Don't know why...
import { ActiveImageEditor } from "../use-editor/with-create-active-image/types"
import { RootBlockElement } from "."

type DemoUploadOptions = { type: "demo"; url: string }

type DirectUploadOptions = Simplify<
  {
    url: string
  } & Omit<SecretAPIUploadProps, "file">
>

type CustomUploadOptions = {
  type: "custom"
  url: string
  data: Record<string, string>
}

export type UploadOptions =
  | DemoUploadOptions
  | DirectUploadOptions
  | CustomUploadOptions

/**
 * Props that are added to the `editor` object passed in through the
 * `useEditor` method.
 */
export type UseEditorProps = {
  initialMarkdown: string
  upload?: UploadOptions
}

/**
 * Custom Editor Props
 */

type CustomEditorProps = ActiveImageEditor & {
  initialMarkdown: string
  /**
   * Save the last active selection so that when we open a modal, which causes
   * selection loss, we can reselect the previous selection
   */
  lastSelection?: Range
  lastValue?: Descendant[]
  modalDialog: UseModalReturnType
  uploadOptions: UploadOptions
  upload: (files: FileList) => void

  /**
   * Optionas passed into `UseEditor`
   */
  // documentId: string
  // initialMarkdown: string
  // uploadPolicyUrl: string
  // appName: string
  // folder: string
  // apiContext: { [key: string]: any }
  /**
   * Returns the current markdown value of the Editor.
   *
   * It must iterate the entire document to generate the markdown so it should
   * not be called too often.
   */
  getMarkdown: () => string
  // bodyRef: React.RefObject<HTMLDivElement>
  /**
   * We use a `ref` to the Editor's container instead of the Body itself which
   * is what we used to do because we use the `Editable` directly to render
   * the Editor's body. Unfortunately, it is not easy to get a ref set on
   * the Editor's body directly, we we instead create a ref to the container.
   *
   * From the container, we can look into its children and find the body.
   */
  containerRef: React.RefObject<HTMLDivElement>
  /*
   * Used when reordering ordered lists. When reordering, there should be
   * an Object in here. When not reordering, set this back to null.
   *
   * There is a `setTimeout` used to ensure that a list is not reordered twice.
   */
  reorderedLists: { [key: string]: true } // | null
  /**
   * Narrow children to only allow RootBlockElement
   */
  children: RootBlockElement[]
}

/**
 * Merged CustomEditor Type
 */

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  CustomEditorProps
