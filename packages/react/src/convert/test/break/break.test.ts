import { check } from "../test-utils"

describe("break", () => {
  it("parse a break", async () => {
    check(
      "alpha\nbravo\ncharlie",
      [{ type: "paragraph", children: [{ text: "alpha\nbravo\ncharlie" }] }],
      "alpha\nbravo\ncharlie"
    )
  })
})
