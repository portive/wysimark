/**
 * On the editor, there are several methods that return void that are used to
 * override default editor behaviors.
 *
 * These are referred to as Overrideable core actions in the docs.
 *
 * - deleteBackward
 * - deleteForward
 * - deleteFragment
 * - insertBreak
 * - insertFragment
 * - insertNode
 * - insertText
 * - normalizeNode
 *
 * When there are plugins, Sink tries to find a plugin to handle the event and
 * if it cannot, uses the previously defined handler. For example, the user may
 * have specified `editor.insertBreak` on the `editor` earlier and that will
 * be called after all the plugins have been searched.
 *
 * We search through the plugins from the first to the last plugin.
 *
 * In a plugin, we specify the functions like we don on the editor but the
 * return value informs us how the plugin should proceed after. The return
 * value generally indicates whether the plugin has handled the event with one
 * special case:
 *
 * - `true`: If the return type is `true` then the plugin has indicated it has
 *   handled the event and no further processing is required. The handlers in
 *   all remaining plugins are skipped.
 *
 * - `false`: If the return type is `false` then the plugin has indicated it has
 *   not handled the event and will continue through the rest of the plugins
 *   looking for a plugin to handle the event.
 *
 * - `() => void`: If the return tyep is a function, the plugin has indicated
 *   it has not handled the event, but that it would like to register another
 *   function that should execute after the actual event handler has been
 *   executed. In particular, this is used when in certain situations we may
 *   want a normalizer to execute after the event handler has triggered. This
 *   is used in the `normalize-after-delete-plugin` for example.
 *
 * NOTE:
 *
 * This seems like an unusual specification at first glance and a purist might
 * argue, this could be handled more succinctly with a `next` function passed
 * in as the final argument.
 *
 * Here's why I elected to go this route but it boils down to the fact that
 * `next` functions make the function difficult to reason about.
 *
 * - 99% of the true, we want to indicate whether we handled the function or
 *   not and for that use case, true/false is simple to understand and natural.
 *   In the case where we need something to happen after, returning a function
 *   is unusual, but still easy to reason about. Also, the exclusivity of
 *   the function return is nice in that it assumes that the event wasn't
 *   handled, and of course, the function return would only ever be used if the
 *   function indeed wasn't handled. For if it was handled, there would be no
 *   need to have the after function because that could just be in the original
 *   function handler.
 *
 * - To use this, you have to build nested contexts that are always hard to
 *   reason about because you are passing a set of contexts from inner child
 *   to outer parent. This created difficult to comprehend complexity in the
 *   old Slate plugins architecture and is probably why it was abandoned.
 *
 * - It's also harder to type properly and to reason about it. The argument
 *   list changes in length depending on the function; furthermore, in some
 *   cases it is natural to ignore the arguments but we'd have to accept blank
 *   arguments that are unused to access the `next` function.
 *
 * - It's hard to debug. The plugin system as it currently is designed to
 *   execute linearly, instead of in a nested fashion. This makes it easy to
 *   add debug code, and know what happens before and after each step.
 */

export type VoidActionReturn = boolean | (() => void)

/**
 * This is a more efficient way of typing a VoidAction from an original
 * action but, at the moment, we aren't doing this because it improves
 * readability on the PluginObject to just respecify the types. We don't have
 * to do any hide-and-seek to get the correct type.
 */
// export type VoidActionType<T extends (...args: any[]) => void> = T extends (
//   ...args: infer Args
// ) => void
//   ? (...args: Args) => boolean | (() => void)
//   : never
