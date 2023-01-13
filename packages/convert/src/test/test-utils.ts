import beautify from "json-beautify"
import { Element } from "wysimark/src"

import { parse, serialize } from ".."

export { parse, serialize } from ".."

export function log(value: unknown) {
  /**
   * This looks like a mistaken type on `beautify` because using `null`
   * is explicitly described in the `beautify` documentaiton.
   *
   * https://www.npmjs.com/package/json-beautify
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(beautify(value, null as any, 2, 60))
}

export function check(
  markdown: string,
  expectedElements?: Element[],
  expectedMarkdown = markdown,
  secondExpectedElements = expectedElements
) {
  const elements = parse(markdown)

  /**
   * Check to see if the generated elements match the expectedElements. If not,
   * we helpfully log the elements before throwing the expect Error. If it looks
   * right, we can just copy and paste.
   */
  try {
    expect(elements).toEqual(expectedElements)
  } catch (e) {
    log(elements)
    console.log(`Error occurred in markdown to elements conversion`)
    throw e
  }

  const regeneratedMarkdown = serialize(elements)

  /**
   * Check to see if the generated elements match the expectedElements. If not,
   * we helpfully log the elements before throwing the expect Error. If it looks
   * right, we can just copy and paste.
   */
  try {
    expect(regeneratedMarkdown).toEqual(expectedMarkdown)
  } catch (e) {
    console.log(
      `Error occurred in regenerated markdown (i.e. markdown converted to elements then converted again to markdown)`
    )
    log(elements)
    throw e
  }

  const secondElements = parse(regeneratedMarkdown)

  /**
   * Check to see if the generated elements match the expectedElements. If not,
   * we helpfully log the elements before throwing the expect Error. If it looks
   * right, we can just copy and paste.
   */
  try {
    expect(secondElements).toEqual(secondExpectedElements)
  } catch (e) {
    log(elements)
    console.log(
      `Error occurred in second markdown to elements conversion (i.e. markdown converted to elements converted to markdown then converted a second time to elements)`
    )
    throw e
  }
}
