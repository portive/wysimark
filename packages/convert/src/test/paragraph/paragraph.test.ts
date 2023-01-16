import { check } from "../test-utils"

describe("paragraph", () => {
  it("should parse a paragraph", async () => {
    check("Lorem", [
      {
        type: "paragraph",
        children: [{ text: "Lorem" }],
      },
    ])
  })

  it("should parse two paragraphs", async () => {
    check("alpha\n\nbravo", [
      {
        type: "paragraph",
        children: [{ text: "alpha" }],
      },
      {
        type: "paragraph",
        children: [{ text: "bravo" }],
      },
    ])
  })
})
