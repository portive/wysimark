import { Editor, Path, Transforms } from "slate"

/**
 * Takes a given and makes that specific path dirty with respect to
 * normalization and executes a normalization path (unless in a
 * `withoutNormalizing` block in which case it will wait until it is completed).
 *
 * A few things you should know:
 *
 * - It doesn't dirty the ancestors. So if you are targeting an Element to be
 *   dirtied, make sure you aren't dirtying the Text node as that won't cause
 *   the parent Element to be dirtied.
 *
 * - It works by setting a key that doesn't make sense to a value and then
 *   unsetting it. This adds some unnecessary noise to the list of operations.
 *
 * The ideal method to implement this would be to modify the DIRTY_PATHS and
 * DIRTY_PATH_KEYS directly; however, these are presently not being exported.
 * This should probably be fixed in the future by an exported function called
 * something like `addDirtyPaths`.
 */
export function forceNormalizePath(editor: Editor, path: Path) {
  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(
      editor,
      // @ts-ignore
      { __DOESNT_MATTER_JUST_TO_START_NORMALIZING__: "123" },
      { at: path }
    )
    Transforms.setNodes(
      editor,
      // @ts-ignore
      { __DOESNT_MATTER_JUST_TO_START_NORMALIZING__: null },
      { at: path }
    )
  })
}
