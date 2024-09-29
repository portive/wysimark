import { check } from "../test-utils"

describe("list unsupported", () => {
  it("should parse a list with children that are not list items", async () => {
    check(
      `- alpha

- # heading

    - alpha
    
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
        {
          type: "unordered-list-item",
          depth: 2,
          children: [{ text: "alpha" }],
        },
      ],
      `- alpha

# heading

- alpha

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
          depth: 0,
          children: [{ text: "alpha" }],
        },
        {
          type: "unordered-list-item",
          depth: 1,
          children: [{ text: "alpha" }],
        },
      ]
    )
  })
})
