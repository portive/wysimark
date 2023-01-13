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
})
