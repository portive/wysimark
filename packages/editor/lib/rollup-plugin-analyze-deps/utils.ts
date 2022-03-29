/**
 * Returns true if the `moduleId` indicates that this is a `node_modules`
 * package. Otherwise, it's an import from within the project itself.
 */
export function isNodeModule(id: string): boolean {
  if (id.match(/\/node_modules\//)) {
    return true
  }
  if (id.match(/^[^/]/)) {
    return true
  }
  return false
}
