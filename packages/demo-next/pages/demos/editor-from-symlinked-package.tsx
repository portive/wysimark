import { createDemo, getServerSideProps } from "@/components/demo"
import { Wysimark, useEditor } from "@wysimark/react"

export { getServerSideProps }

/**
 * IF BUILD IS FAILING, HERE'S WHAT TO DO
 *
 * If the deploy or build is failing because of a failure to lint, this is
 * because the demo is expecting `Wysimark` and `useEditor` to be the current
 * version, but before the build is execute, the symlink is pointing to the
 * old version.
 *
 * The solution is to
 *
 * 1. Comment out the line below so it can pass lint
 * 2. `yarn build`
 * 3. Uncomment the line below
 */

export default createDemo({ Wysimark, useEditor })
