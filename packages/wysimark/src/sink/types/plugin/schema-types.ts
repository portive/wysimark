import { SetOptional } from "type-fest"

/**
 * IMPORTANT!
 *
 * NEVER!
 *
 * refer to a type that is defined in the `slate` package. This is because
 * any reference to a Slate type will cause a circular reference type error that
 * is very hard to track down.
 *
 * NOTE: This kind of happens in that `Element` will often have a reference to
 * `Descendant` but it looks like this is okay; however, let's not tempt fate
 * by only using it where the definition is absolutely necessary.
 *
 * ALWAYS!
 *
 * Be explicity about return types. If they are inferred through the return
 * type, because we need to provide `Editor` as an argument in certain cases,
 * we don't want to accidentally have `Editor` be provided as a return type
 * or this will create the circular reference.
 */

export type BasePluginSchema = {
  Name: string
  Options: Record<string, unknown>
  Editor: Record<string, unknown>
  Element: { type: string }
  Text: Record<string, unknown>
}
/**
 * These are the PluginTypes that are accepted as inputs into `createPlugin`
 * which has the same basic signature as `BasePluginTypes` but some of the
 * types are optional.
 *
 * These `InputPluginTypes` need to have their optional types filled in with
 * defaults before they can be used.
 *
 * See `NormalizeInputPluginTypes`
 */

export type InputPluginSchema = SetOptional<
  BasePluginSchema,
  "Options" | "Editor" | "Element" | "Text"
>
/**
 * Takes an `InputPluginSchema` (that has some optional types) and turns them
 * into a regular PluginTypes with any missing types filled in with defaults.
 */
export type NormalizeInputPluginSchema<T extends InputPluginSchema> = {
  Name: T["Name"]
  Options: T["Options"] extends object ? T["Options"] : {}
  Editor: T["Editor"] extends object ? T["Editor"] : {}
  Element: T["Element"] extends object ? T["Element"] : never
  Text: T["Text"] extends object ? T["Text"] : {}
}

/**
 * The result of calling ExtractCustomTypes (may be renamed to
 * ExtractPluginSchema or something else in the future) on an array of
 * `PluginSchema` types.
 *
 * This value is used as an input to `createSink` so that we have access to the
 * `Options` type since the second argument to `createSink` is `options:
 * Options`
 */
export type ExtractedPluginSchema = {
  Options: Record<string, unknown>
  // Editor: Record<string, unknown>
  Element: { type: string }
  Text: Record<string, unknown>
}
