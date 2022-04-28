import { CustomEditor } from "./editor"
import { CustomElement } from "./element"
import { CustomText } from "./text"
export { IsElementType } from "./is-element-utils"
export * from "./element"
export * from "./code"
export * from "./list"
export * from "./text"
export * from "./blockquote"
export * from "./void"
export * from "./table"
export * from "./inline"
export * from "./flush"
export * from "./editor"
export * from "./editor-event"
export * from "./segment"
export * from "./element"
export * from "./wysimark"
export * from "./upload"

/**
 * Extend Slate's Element and Text type with our CustomTypes
 */

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
