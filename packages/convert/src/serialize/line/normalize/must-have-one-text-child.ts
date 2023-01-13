import { isElement, NormalizeOptions } from "./utils"

export function mustHaveOneTextChild({ node }: NormalizeOptions): boolean {
  if (!isElement(node)) return false
  if (node.type !== "line") return false
  if (node.children.length > 0) return false
  node.children.push({ text: "" })
  return true
}
