import { normalizers } from "./normalizers"
import { NormalizeOptions } from "./types"

/**
 * Attempts to run all normalizers on the given Node one by one.
 *
 * If any normalizer makes an update, this function exits immediately and
 * returns a `true` value indicating that a normalizer has made an update.
 *
 * Because we don't know how that update modified the data structure, another
 * pass will be made at running all the normalizers.
 *
 * This is not the most efficient route, but there isn't a lot of processing
 * we need to do and this reduces the likelihood of bugs. Normalization is
 * similar to how it works in Slate but we don't keep track of dirty paths
 * and simply rerun the normalizations at the given level until it is clean.
 */
export function runNormalizersOnNode(normalizeOptions: NormalizeOptions) {
  for (const normalizer of normalizers) {
    const isHandled = normalizer(normalizeOptions)
    if (isHandled) {
      return true
    }
  }
  return false
}
