import { check } from "../test-utils"

describe("link", () => {
  it("should convert a link reference", async () => {
    check(
      `[alpha][id]

[id]: http://localhost/alpha "Optional Title Here"`,
      [
        {
          type: "paragraph",
          children: [
            { text: "" },
            {
              type: "anchor",
              href: "http://localhost/alpha",
              children: [{ text: "alpha" }],
            },
            { text: "" },
          ],
        },
      ],
      `[alpha](http://localhost/alpha)`
    )
  })

  // TODO: Add a test for converting an imageReference to an image
})
