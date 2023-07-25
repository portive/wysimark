import { check } from "../test-utils"

describe("heading level invalid", () => {
  it("should parse 7 hashes as a paragraph and reconvert to escaped hashes", async () => {
    check(
      "####### Lorem",
      [
        {
          type: "paragraph",
          children: [{ text: "####### Lorem" }],
        },
      ],
      `\\#\\#\\#\\#\\#\\#\\# Lorem`
    )
  })
})
