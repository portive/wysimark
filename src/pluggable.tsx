import { BaseEditor, BaseElement, BaseText, createEditor } from "slate"
import { HistoryEditor, withHistory } from "slate-history"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

let renderElement: any

let useSlatePluggable: any
let SlateCloudPlugin: any
let createPluggableConfig: any

// other types

/**
 * The ARGS represents the arguments that will be passed into the function.
 * T always represents the return value.
 */
type Resolvable<T, ARGS extends unknown[] = []> = T
type ResolvablePromise<T, ARGS extends unknown[] = []> = Promise<T>

// types for Pluggable
type PluggableEditor<T extends BaseEditor> = any
type PluggableElement<T> = any
type PluggableText<T> = any
type PluggableConfig = any
type PluggablePluginBase = {
  Editor: BaseEditor
  Element: BaseElement
  Text: BaseText
}
// types for Cloud Plugin
type CloudEditor = any

const CloudPlugin = ({
  authToken,
}: {
  authToken: string
  maxWidth: Resolvable<number, [CloudEditor]>
}) => {
  return (editor: any): any => {
    return { editor }
  }
}

/**
 * The pluggable config is defined outside `MyEditor` because it serves two
 * purposes:
 *
 * 1. Define the `CustomTypes` which needs to be done outside a Component
 * 2. Configuration for `useSlatePluggable`
 */
const pluggable = createPluggableConfig(
  CloudPlugin({ authToken: "PRTV_xxxx_xxxx", maxWidth: 640 })
)

/**
 * Custom Types for Slate
 */
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor &
      PluggableEditor<typeof pluggable> // CloudPlugin['Editor']
    Element: PluggableElement<typeof pluggable> // CloudPlugin['Element']
    Text: PluggableText<typeof pluggable> // CloudPlugin['Text']
  }
}

/**
 * The Component
 */
export const MyEditor = () => {
  const { editor, slatePropsWith, editablePropsWith } = useSlatePluggable({
    /**
     * passed as a function so that it is only called once (with useState)
     *
     * Note that this is optional. By default it uses
     * withReact(withHistory(createEditor()))
     */
    editor: () => withReact(withHistory(createEditor())),
    /**
     * passed as a function so that it is only called once (with useState)
     */
    initialValue: () => [{ type: "paragraph", children: [{ text: "Hello" }] }],
    pluggable,
  })

  return (
    <Slate {...slatePropsWith({})}>
      <Editable {...editablePropsWith({ renderElement })} />
    </Slate>
  )
}
