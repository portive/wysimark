/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("normalize code-line", () => {
  describe("don't normalize", () => {
    it("is checked in normalize-code-block", async () => {
      /* added for clarity */
    })
  })

  describe("normalize invalid parent", () => {
    it("should convert itself to a paragraph if it has the wrong parent", async () => {
      const input = (
        <editor>
          <code-line>
            <text>hello</text>
          </code-line>
        </editor>
      )
      const output = (
        <editor>
          <p>hello</p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize empty children", () => {
    it("shouldn't do anything if it has empty children because that's okay", async () => {
      /* added for clarity */
    })
  })

  describe("normalize invalid children", () => {
    it("should remove links and styled text from code-line children", async () => {
      const input = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>hello </text>
              <text bold>bold </text>
              <link url="https://www.google.com">
                <text>Google</text>
              </link>
            </code-line>
          </code-block>
        </editor>
      )
      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>hello bold Google</text>
            </code-line>
          </code-block>
          <p>
            <text />
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })
})
