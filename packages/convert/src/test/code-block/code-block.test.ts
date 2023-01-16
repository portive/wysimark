import { check } from "../test-utils"

describe("code-block", () => {
  it("should parse a code-block", async () => {
    check(
      `\`\`\`javascript
function hello() {
  console.log("Hello")
}
\`\`\``,
      [
        {
          type: "code-block",
          language: "javascript",
          children: [
            {
              type: "code-block-line",
              children: [{ text: "function hello() {" }],
            },
            {
              type: "code-block-line",
              children: [{ text: '  console.log("Hello")' }],
            },
            {
              type: "code-block-line",
              children: [{ text: "}" }],
            },
          ],
        },
      ]
    )
  })

  it("should parse a code-block that contains three backticks", async () => {
    check(
      `\`\`\`\`text
To make a code block use three backticks like

\`\`\`
\`\`\`\``,
      [
        {
          type: "code-block",
          language: "text",
          children: [
            {
              type: "code-block-line",
              children: [
                {
                  text: "To make a code block use three backticks like",
                },
              ],
            },
            {
              type: "code-block-line",
              children: [{ text: "" }],
            },
            {
              type: "code-block-line",
              children: [{ text: "```" }],
            },
          ],
        },
      ]
    )
  })

  it("should parse a code-block that contains four backticks", async () => {
    check(
      `\`\`\`\`\`text
\`\`\`
\`\`\`\`
\`\`\`\`\``,
      [
        {
          type: "code-block",
          language: "text",
          children: [
            {
              type: "code-block-line",
              children: [{ text: "```" }],
            },
            {
              type: "code-block-line",
              children: [{ text: "````" }],
            },
          ],
        },
      ]
    )
  })
})
