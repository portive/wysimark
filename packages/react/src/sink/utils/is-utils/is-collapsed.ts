import { Range } from "slate"

export function isCollapsed(
  selection: Range | null | undefined
): selection is Range {
  if (selection == null) return false
  return Range.isCollapsed(selection)
}
