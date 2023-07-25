import { check } from "../test-utils"

describe("footnote", () => {
  it("should convert a footnote reference to plain text", async () => {
    /**
     * GitHub Flavored Markdown, our current translation target, doesn't support
     * footnotes although this is something we could support in the future.
     *
     * Currently, if we encounter a footnote, we translate it to a block quote
     * and make it kind of work in GFM. This gives users compatibility if
     * something that looks like a footnote creeps in.
     *
     * Later, consider adding footnotes under a feature flag.
     */
    check(
      `alpha[^1]

[^1]: alpha`,
      [
        {
          type: "paragraph",
          children: [{ text: "alpha[1]" }],
        },
        {
          type: "block-quote",
          children: [
            {
              type: "paragraph",
              children: [{ text: "[1]" }],
            },
            {
              type: "paragraph",
              children: [{ text: "alpha" }],
            },
          ],
        },
      ],
      `alpha\\[1\\]

> \\[1\\]
>
> alpha`
    )
  })
})
