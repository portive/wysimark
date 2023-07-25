import { parse } from "../.."
import { check } from "../test-utils"

describe("marks", () => {
  /**
   * https://github.github.com/gfm/#example-308
   */
  it("should backslash escape", async () => {
    const value = parse(
      `\\!\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\_\\\`\\{\\|\\}\\~`
    )
    expect(value).toEqual([
      {
        type: "paragraph",
        children: [{ text: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" }],
      },
    ])

    check(
      `\\!\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\_\\\`\\{\\|\\}\\~`,
      [
        {
          type: "paragraph",
          children: [{ text: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" }],
        },
      ]
    )
  })
})
