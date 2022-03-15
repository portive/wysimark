/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("normalize code", () => {
  describe("don't normalize", () => {
    it("should leave a good code block alone", async () => {
      const input = (
        <editor>
          <code-block language="text">
            <code-line>
              <text />
            </code-line>
          </code-block>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text />
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

  describe("normalize invalid parent", () => {
    it("doesn't need to normalize invalid parent", async () => {
      /* added for clarity */
    })
  })

  describe("normalize empty children", () => {
    it("should remove itself if it has no children", async () => {
      const input = (
        <editor>
          <code-block language="text"></code-block>
          <p>
            <text>trailing</text>
          </p>
        </editor>
      )
      const output = (
        <editor>
          <p>
            <text>trailing</text>
          </p>
        </editor>
      )
      normalize(input, output)
    })
  })

  describe("normalize invalid children", () => {
    it("should convert invalid convertible children into code-line", async () => {
      const input = (
        <editor>
          <code-block language="text">
            <p>
              <text italic>abc</text>
            </p>
            <heading level={1}>
              <text bold>def</text>
            </heading>
          </code-block>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>abc</text>
            </code-line>
            <code-line>
              <text>def</text>
            </code-line>
          </code-block>
          <p>
            <text />
          </p>
        </editor>
      )

      normalize(input, output)
    })

    /**
     * FIXME:
     */
    it.skip("should convert invalid nested children into code-line", async () => {
      const input = (
        <editor>
          <code-block language="text">
            <table columns={[{ align: "left" }]}>
              <tr>
                <td index={0}>
                  <p>abc</p>
                </td>
              </tr>
              <tr>
                <td index={0}>
                  <p>def</p>
                </td>
              </tr>
            </table>
          </code-block>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>abc</text>
            </code-line>
            <code-line>
              <text>def</text>
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
