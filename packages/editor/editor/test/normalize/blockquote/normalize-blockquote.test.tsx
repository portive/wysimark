/** @jsx jsx  */
import { jsx, normalize } from "../../test-utils"

describe("normalize blockquote", () => {
  describe("don't normalize", () => {
    it("should leave valid simple blockquotes alone", async () => {
      const input = (
        <editor>
          <blockquote>
            <blockquote>
              <p>
                <text>abc</text>
              </p>
            </blockquote>
            <blockquote>
              <p>
                <text>def</text>
              </p>
            </blockquote>
            <p>
              <text>ghi</text>
            </p>
          </blockquote>
          <p>
            <text>jkl</text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <blockquote>
              <p>
                <text>abc</text>
              </p>
            </blockquote>
            <blockquote>
              <p>
                <text>def</text>
              </p>
            </blockquote>
            <p>
              <text>ghi</text>
            </p>
          </blockquote>
          <p>
            <text>jkl</text>
          </p>
        </editor>
      )

      normalize(input, output)
    })

    it("should leave valid table children alone", async () => {
      const input = (
        <editor>
          <blockquote>
            <table columns={[{ align: "left" }]}>
              <tr>
                <td index={0}>
                  <p>abc</p>
                </td>
              </tr>
            </table>
          </blockquote>
          <p>
            <text></text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <table columns={[{ align: "left" }]}>
              <tr>
                <td index={0}>
                  <p>abc</p>
                </td>
              </tr>
            </table>
          </blockquote>
          <p>
            <text></text>
          </p>
        </editor>
      )

      normalize(input, output)
    })

    it("should leave valid code blocks alone", async () => {
      const input = (
        <editor>
          <blockquote>
            <code-block language="text">
              <code-line>
                <text>abc</text>
              </code-line>
              <code-line>
                <text>abc</text>
              </code-line>
            </code-block>
          </blockquote>
          <p>
            <text></text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <code-block language="text">
              <code-line>
                <text>abc</text>
              </code-line>
              <code-line>
                <text>abc</text>
              </code-line>
            </code-block>
          </blockquote>
          <p>
            <text></text>
          </p>
        </editor>
      )

      normalize(input, output)
    })
  })

  describe("normalize invalid parent", () => {
    it("n/a", async () => {
      /**
       * Blockquote can only have `Editor` or `Blockquote` as its parent.
       *
       * However, it's not necessary to do any special normalizing for this
       * because the only other places that elements can go are children of
       * `code-block` and children of `td` which are handled by their respective
       * normalizers.
       */
    })
  })

  describe("normalize empty children", () => {
    it("should remove itself if it has no children", async () => {
      const input = (
        <editor>
          <blockquote></blockquote>
          <p>
            <text></text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text></text>
          </p>
        </editor>
      )

      normalize(input, output)
    })
  })

  describe("normalize invalid children", () => {
    it("n/a", async () => {
      /**
       * Whatever children are valid for the `Editor` is valid in a blockquote
       * so we don't need to do any special handling.
       *
       * Even a `blockquote` is valid in a blockquote
       */
    })
  })

  describe("normalize props", () => {
    it("n/a", async () => {
      /**
       * No props in a blockquote
       */
    })
  })
})
