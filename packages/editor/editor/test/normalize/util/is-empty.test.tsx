/** @jsx jsx  */
import { Element } from "slate"
import { isEmptyElement } from "~/editor/normalize/util"

/**
 * IMPORTANT:
 *
 * We are testing for an empty `Element` during the normalization process so
 * some of these structures will be fixed by the default normalization
 * constraints built into Slate.
 *
 * However, we want to detect these empty nodes before the default constraints
 * run so these invalid structure are necessary to test against.
 */

describe("isEmpty", () => {
  it("should not be empty if it has an element child", async () => {
    const node: Element = {
      type: "code-block",
      language: "text",
      children: [{ type: "code-line", children: [{ text: "" }] }],
    }
    expect(isEmptyElement(node)).toEqual(false)
  })

  it("should not be empty if it has more than one child", async () => {
    const node: Element = {
      type: "p",
      children: [{ text: "a" }, { text: "b", bold: true }],
    }
    expect(isEmptyElement(node)).toEqual(false)
  })

  it("should not be empty if the single text is not empty", async () => {
    const node: Element = {
      type: "p",
      children: [{ text: "abc" }],
    }
    expect(isEmptyElement(node)).toEqual(false)
  })

  it("should not be empty if there is an inline", async () => {
    /**
     * NOTE:
     * During normalization, this will expand to have surrounding `Text` nodes
     * but that normalization may not have happened yet when `isEmpty` has
     * run.
     */
    const node: Element = {
      type: "p",
      children: [{ type: "link", url: "", children: [{ text: "" }] }],
    }
    expect(isEmptyElement(node)).toEqual(false)
  })

  it("should be empty if the single text is empty", async () => {
    const node: Element = {
      type: "p",
      children: [{ text: "" }],
    }
    expect(isEmptyElement(node)).toEqual(true)
  })
})
