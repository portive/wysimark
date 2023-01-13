import { parse } from "../.."

describe("list unsupported", () => {
  it("should parse a list with children that are not list items", async () => {
    const value = parse(`- alpha\n  - # heading\n  - alpha.1`)
    expect(value).toEqual([
      {
        type: "unordered-list-item",
        depth: 0,
        children: [{ text: "alpha" }],
      },
      { type: "heading", level: 1, children: [{ text: "heading" }] },
      {
        type: "unordered-list-item",
        depth: 1,
        children: [{ text: "alpha.1" }],
      },
    ])
  })
})
