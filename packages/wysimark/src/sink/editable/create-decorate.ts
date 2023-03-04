import { NodeEntry, Range } from "slate"
import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"
import { defined } from "./utils"

/**
 * Create the substituted `decorate` method.
 *
 * With decorate, we are taking all the ranges from all the decorators and
 * combining them together, including the ranges created from the `decorate`
 * attribute on `SinkEditable`.
 */
export function createDecorate(
  originalFn: EditableProps["decorate"],
  plugins: BasePluginPolicy[]
): NonNullable<EditableProps["decorate"]> {
  const fns = plugins
    .map((plugin) => plugin.editableProps?.decorate)
    .filter(defined)
  return function (entry: NodeEntry): Range[] {
    const ranges: Range[] = []
    for (const fn of fns) {
      const resultRanges = fn(entry)
      ranges.push(...resultRanges)
    }
    if (originalFn) ranges.push(...originalFn(entry))
    return ranges
  }
}
