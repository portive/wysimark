import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"

/**
 * Create the substituted event handler method.
 *
 * Generally, we are looking for the first result from any plugin or on
 * SinkEditable and return the first one that returns a value only.
 *
 * Iterate over all the plugin handlers. If one handler returns `false`
 * then we go to the next one until we get one that returns `true`. If we don't
 * fine on that returns `true`, then we go to the handler passed to the
 * `SinkEditable` component.
 */

/**
 * TODO:
 *
 * It's probably not THAT important, but the holy grail as a programmer here is
 * to:
 *
 * 1. Have these functions created without the boilerplate. It really feels
 *    like it could be one function that takes `plugins` and a `key` and all
 *    the typing and stuff would work.
 *
 * 2. Build it in a way that's easy to reason about. There is probably a way
 *    to do this that works, but nobody will ever be able to work on it if there
 *    is a problem, and probably a way to do it where it's somewhat
 *    comprehensible.
 */

/**
 * Here we define strictly the type for a method that creates an Event Handler
 * on Editable. We define this separately because (a) it is easier to do it and
 * give clarity to it as a separate type and (b) we want to check the actual
 * method that we created against this type as an early warning signal if we
 * did something wrong.
 *
 * A method that creates a method, that pulls from a plugin a function that is
 * similar to, but not exactly, like the function that it is going to be
 * returning, is a bit of a nightmare and this helps make sure we don't make
 * mistakes.
 *
 * In other words, don't remove this and use the automatic typing as it's a
 * good way to make sure that this method is typed correctly.
 */
type CreateHandler<K extends keyof EditableProps> = (
  originalFn: EditableProps[K],
  plugins: BasePluginPolicy[]
) => NonNullable<EditableProps[K]>

/**
 * Takes an array of Plugin objects and extracts all of the specified
 * `editableProps` handler functions from it. If it's not defined, we skip it
 * so that we end up with an Array that is populated with the functions only
 * and no `undefined` in it.
 */
function extractEditableFns<
  K extends keyof Required<BasePluginPolicy>["editableProps"]
>(
  plugins: BasePluginPolicy[],
  key: K
): NonNullable<Required<BasePluginPolicy>["editableProps"][K]>[] {
  const fns: NonNullable<Required<BasePluginPolicy>["editableProps"][K]>[] = []
  for (const plugin of plugins) {
    const maybeFn = plugin.editableProps?.[key]
    if (maybeFn) fns.push(maybeFn)
  }
  return fns
}

/**
 * Takes an array of handler functions that will return a boolean which
 * indicates that an event was handled. If the function was handled, then we
 * return and stop execution immediately.
 *
 * We keep going through all the handlers until something handles it.
 *
 * If none of the plugin fns handle it, then we check to see if there was an
 * original function defined and execute that if there is.
 */
function createHandlerFn<A>(
  fns: ((arg: A) => boolean)[],
  originalFn: ((arg: A) => void) | undefined
) {
  return function (event: A) {
    for (const fn of fns) {
      if (fn(event)) return
    }
    originalFn?.(event)
  }
}

/**
 * keyDown handler
 */
export const createOnKeyDown: CreateHandler<"onKeyDown"> = (
  originalFn,
  plugins
) => {
  const fns = extractEditableFns(plugins, "onKeyDown")
  return createHandlerFn(fns, originalFn)
}

/**
 * keyUp handler
 */
export const createOnKeyUp: CreateHandler<"onKeyUp"> = (
  originalFn,
  plugins
) => {
  const fns = extractEditableFns(plugins, "onKeyUp")
  return createHandlerFn(fns, originalFn)
}

/**
 * onPaste handler
 */
export const createOnPaste: CreateHandler<"onPaste"> = (
  originalFn,
  plugins
) => {
  const fns = extractEditableFns(plugins, "onPaste")
  return createHandlerFn(fns, originalFn)
}

/**
 * onDrop handler
 */
export const createOnDrop: CreateHandler<"onDrop"> = (originalFn, plugins) => {
  const fns = extractEditableFns(plugins, "onDrop")
  return createHandlerFn(fns, originalFn)
}
