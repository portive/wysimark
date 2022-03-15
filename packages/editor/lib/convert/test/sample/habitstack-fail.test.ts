import { RootBlockElement } from "~/editor/types"
import { testParse } from "../convert-test-utils"

describe("habitstack-fail", () => {
  it("should parse habitstack markdown", () => {
    /**
     * NOTE:
     *
     * Some of this behavior may be unexpected. The `a. S`, `b. c`, etc. are
     * considered part of the bullet above because `a.` is not valid markdown
     * for a list element in which case remark considers it part of the previous
     * list item.
     *
     * The single space prefixed ` #reviewed` seems somehow be parsed as a
     * paragraph in the preceding list item which in our parser turns it into
     * another bullet.
     */
    const markdown = `- B
a. S
b. c
  - a
  - b

- D
a. c

- D
a. m
    
 #reviewed`
    const blocks: RootBlockElement[] = [
      {
        type: "unordered-list-item",
        depth: 0,
        children: [
          {
            text: "B\na. S\nb. c",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [
          {
            text: "a",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [
          {
            text: "b",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [
          {
            text: "D\na. c",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [
          {
            text: "D\na. m",
          },
        ],
      },
      {
        type: "unordered-list-item",
        depth: 0,
        children: [
          {
            text: " #reviewed",
          },
        ],
      },
      { type: "p", children: [{ text: "" }] },
    ]
    testParse(markdown, blocks)
  })
})
