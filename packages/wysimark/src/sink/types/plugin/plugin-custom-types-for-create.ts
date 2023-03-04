import { SetOptional } from "type-fest"

import { BasePluginCustomTypes } from ".."

/**
 * TODO:
 *
 * These should be merged with the `plugin-custom-types` in the same directory.
 *
 * At some point, there was some fancy typing efforts in order to get the
 * CustomTypes automatically extracted from the plugins; however, it turns out
 * that due to limitations in TypeScript, at least as hard as we've tried,
 * this is impossible.
 *
 * Because of this, we should probably make efforts to simplify the Custom
 * Types as much as possible.
 */

/**
 * These are the Input Custom Types for the Plugin which differ from the actual
 * Custom Types for the plugin because, apart from `Name`, most of the
 * keys except for `Name` are optional.
 */

// export type InputPluginCustomTypes = {
//   Name: string
//   /**
//    * This describes the additional properties on the Editor, not the full
//    * Editor. This is why it does not extend BaseEditor.
//    */
//   Editor?: Record<string, unknown>
//   /**
//    * This describes an Element type to be used with this plugin. Note that it
//    * can actually be multiple Element types combined with `|`
//    */
//   Element?: BaseElement
//   /**
//    * This describes a Text type to be used with this plugin.
//    */
//   Text?: BaseText
// }

export type InputPluginCustomTypes = SetOptional<
  BasePluginCustomTypes,
  "Editor" | "Element" | "Text"
>

export type NormalizeInputPluginCustomTypes<T extends InputPluginCustomTypes> =
  {
    Name: T["Name"]
    Editor: T["Editor"] extends object ? T["Editor"] : {}
    Element: T["Element"] extends object ? T["Element"] : never
    Text: T["Text"] extends object ? T["Text"] : {}
  }
