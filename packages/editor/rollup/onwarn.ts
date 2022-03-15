/**
 * Stop Rollup from warning about circular dependencies.
 */
export const onwarn = (warning: any) => {
  if (warning.code !== "CIRCULAR_DEPENDENCY") {
    console.warn(`(!) ${warning.message}`) // eslint-disable-line no-console
  }
}
