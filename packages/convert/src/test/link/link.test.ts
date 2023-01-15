import { parse } from "../.."
import { check, log } from "../test-utils"

describe("link", () => {
  it("should convert a link", async () => {
    check("[alpha](https://localhost/alpha)", [
      {
        type: "paragraph",
        children: [
          {
            type: "anchor",
            href: "https://localhost/alpha",
            children: [{ text: "alpha" }],
          },
        ],
      },
    ])
  })

  it("should convert a link surrounded by text", async () => {
    check("alpha [bravo](https://localhost/bravo) charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          {
            type: "anchor",
            href: "https://localhost/bravo",
            children: [{ text: "bravo" }],
          },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should convert two links surrounded by text", async () => {
    check(
      "alpha [bravo](https://localhost/bravo)[charlie](https://localhost/charlie) delta",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "anchor",
              href: "https://localhost/bravo",
              children: [{ text: "bravo" }],
            },
            {
              type: "anchor",
              href: "https://localhost/charlie",
              children: [{ text: "charlie" }],
            },
            { text: " delta" },
          ],
        },
      ]
    )
  })

  it("should convert two links surrounded by text one bold one italic", async () => {
    check(
      "alpha **[bravo](https://localhost/bravo)**_[charlie](https://localhost/charlie)_ delta",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "anchor",
              href: "https://localhost/bravo",
              children: [{ text: "bravo", bold: true }],
            },
            {
              type: "anchor",
              href: "https://localhost/charlie",
              children: [{ text: "charlie", italic: true }],
            },
            { text: " delta" },
          ],
        },
      ]
    )
  })

  it("should convert link with inner and outer marks", async () => {
    check("**[alpha _bravo_](https://localhost/alpha)**", [
      {
        type: "paragraph",
        children: [
          {
            type: "anchor",
            href: "https://localhost/alpha",
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
        ],
      },
    ])
  })
})
