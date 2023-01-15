import { check } from "../test-utils"

describe("html", () => {
  it("should should convert html to inline code", async () => {
    check(
      "alpha <p> bravo",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            { text: "<p>", code: true },
            { text: " bravo" },
          ],
        },
      ],
      "alpha `<p>` bravo"
    )
  })
})
