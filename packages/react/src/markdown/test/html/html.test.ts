import { check } from "../test-utils"

describe("html", () => {
  it("should convert a line of html to code-block", async () => {
    check(
      `<p>`,
      [
        {
          type: "code-block",
          language: "html",
          children: [
            {
              type: "code-block-line",
              children: [{ text: "<p>" }],
            },
          ],
        },
      ],
      `\`\`\`html
<p>
\`\`\``
    )
  })

  it("should convert lines of html to a code-block", async () => {
    check(
      `<div>
  Hello
</div>`,
      [
        {
          type: "code-block",
          language: "html",
          children: [
            {
              type: "code-block-line",
              children: [{ text: "<div>" }],
            },
            {
              type: "code-block-line",
              children: [{ text: "  Hello" }],
            },
            {
              type: "code-block-line",
              children: [{ text: "</div>" }],
            },
          ],
        },
      ],

      `\`\`\`html
<div>
  Hello
</div>
\`\`\``
    )
  })

  it("should convert a line of html to code-block and also inline code", async () => {
    check(
      `<p>\n\nHello <hr>`,
      [
        {
          type: "code-block",
          language: "html",
          children: [
            {
              type: "code-block-line",
              children: [{ text: "<p>" }],
            },
          ],
        },
        {
          type: "paragraph",
          children: [{ text: "Hello " }, { text: "<hr>", code: true }],
        },
      ],
      `\`\`\`html
<p>
\`\`\`

Hello \`<hr>\``
    )
  })
})
