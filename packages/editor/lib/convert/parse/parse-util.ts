import * as Mdast from "../mdast"

/**
 * Text any node and extracts all the descendant `text` out of it and turns it
 * into a string
 */
export function stringifyNode(node: Mdast.Content): string {
  return convertNodeToTextArray(node).join("")
}

function convertNodeToTextArray(node: Mdast.Content): string[] {
  if (node.type === "text" || node.type === "code" || node.type === "html")
    return [node.value]
  if (typeof node.children === "undefined") return []
  const texts: string[] = []
  for (const child of node.children as Mdast.Content[]) {
    const childTexts = convertNodeToTextArray(child)
    texts.push(...childTexts)
  }
  return texts
}
