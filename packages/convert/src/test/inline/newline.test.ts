import { check } from "../test-utils"

describe("html", () => {
  it("should convert a newline", async () => {
    check("alpha\nbravo", [
      {
        type: "paragraph",
        children: [{ text: "alpha\nbravo" }],
      },
    ])
  })
})
