import { check } from "../test-utils"

describe("thematic break invalid", () => {
  it("should not parse two dashes as a thematic break", async () => {
    check(
      "--",
      [
        {
          type: "paragraph",
          children: [{ text: "--" }],
        },
      ],
      "\\-\\-"
    )
  })
})
