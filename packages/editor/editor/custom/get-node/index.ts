import { Node, NodeEntry, Path, Text } from "slate"

/**
 * Check if a descendant node exists at a specific path and returns it if it
 * exists and return `undefined` if it does not.
 *
 * TODO: Add `Node.getIf` to `slate` itself
 */

export function getNodeIf(root: Node, path: Path): NodeEntry | undefined {
  let node = root

  for (let i = 0; i < path.length; i++) {
    const p = path[i]

    if (Text.isText(node) || !node.children[p]) {
      return undefined
    }

    node = node.children[p]
  }

  return [node, path]
}

export function getNodeBeforeIf(root: Node, path: Path): NodeEntry | undefined {
  if (path[path.length - 1] <= 0) return undefined
  return getNodeIf(root, Path.previous(path))
}

export function getNodeAfterIf(root: Node, path: Path): NodeEntry | undefined {
  return getNodeIf(root, Path.next(path))
}
