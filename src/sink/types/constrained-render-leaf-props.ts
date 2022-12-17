/**
 * Creates the RenderLeafProps where the leaf/text argument coming in is
 * constrained to a specific Text type. This is useful during the creation of
 * a Plugin where we want to isolate the choice of `Text` to whatever is
 * available for that specific plugin.
 *
 * NOTE: Because of the specific use case (i.e. for a Plugin) we have removed
 * the availability in the types of the `attributes` prop. This is because
 * we do not want the user adding this prop themselves. In plugins, this is
 * added automatically. This is done because only the outermost HTML Element
 * should have the attributes on it. If the user manually adds it, then we
 * end up with the attributes doubled up.
 */
export type ConstrainedRenderLeafProps<Text> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  leaf: Text
  text: Text
  /**
   * KEEP:
   *
   * Removed from the props given because we don't want the user to add it
   * themselves.
   *
   * Do not delete it as it's useful for reference.
   */
  // attributes: {
  //   "data-slate-leaf": true
  // }
}
