import { check } from "../test-utils"

describe("list unsupported", () => {
  /**
   * TODO:
   *
   * When a list item has children that are not list items like a heading,
   * the list item should be closed and the heading should be parsed as a
   * sibling of the list.
   *
   * This works; however, the following unordered-list-item is at a deeper
   * level in this example. And when it's serialized, it comes out with some
   * leading spaces. When the first item starts with leading spaces, even
   * though it looks like a list, the Markdown interpreter will interpret
   * this as a code-block.
   */
  it("should parse a list with children that are not list items", async () => {
    check(
      `- alpha

- # heading

    - alpha`,
      [
        {
          type: "unordered-list-item",
          depth: 0,
          children: [{ text: "alpha" }],
        },
        { type: "heading", level: 1, children: [{ text: "heading" }] },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "alpha" }],
        },
      ],
      `- alpha

# heading

    - alpha`
    )
  })
})
