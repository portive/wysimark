import { Descendant, Editor, NodeEntry } from "slate"

/**
 * This normalization utility is useful when you need to adjust an Element
 * depending on the Element before or after it.
 *
 * For example, if two of the same nodes are next to each other, they can be
 * merged together.
 *
 * Or in the case of a numbered list, we want to reset the counter only if
 * the list is deeper than the previous one.
 *
 * The thing that makes these method efficient is that it can often replace
 * having to search through all children of the parent of the current element.
 * Normally, to compare siblings, you'd have to look at the parent in order
 * to make sure you normalize siblings propertly; however, this method will
 * look both at the pair before/current and current/after to make sure that
 * neighbor siblings do the right thing.
 *
 * When used through a full normalization, it can solve bigger problems. For
 * example, if you have 5 elements that are all the same and they need to
 * all be merged, one by one, they will merged into a single Element.
 *
 * HINT:
 *
 * If there is a bug related to not being able to find a Path, remember to
 * return `true` in the `transform` function when a `transform` is executed.
 *
 * After a `transform` is run, the state of the document is changed and
 * running the second `transform` may result in accessing an invalid path.
 */
export function normalizeSiblings<T extends Descendant>(
  editor: Editor,
  entry: NodeEntry<T>,
  transform: (a: NodeEntry<T>, b: NodeEntry<T>) => boolean
): boolean {
  const [, path] = entry

  const prevEntry = Editor.previous<T>(editor, { at: path })
  if (prevEntry && transform(prevEntry, entry)) return true

  const nextEntry = Editor.next<T>(editor, { at: path })
  if (nextEntry && transform(entry, nextEntry)) return true

  return false
}
