/** @jsx jsx  */
import { Transforms } from "slate"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("delete", () => {
  it("should delete a whole nested block element with Transforms.delete", async () => {
    const input = (
      <editor>
        <p>
          <text></text>
        </p>
        <code-block language="text">
          <code-line>
            <text></text>
          </code-line>
        </code-block>
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
        <p>
          <text></text>
        </p>
      </editor>
    )

    compare(input, output, (editor) => {
      Transforms.delete(editor, { at: [1] })
    })
  })

  it("does not handle deleting first part of a nested code block respectfully", async () => {
    /**
     * It merges the codeline into the paragraph which is unexpected
     */
    const input = (
      <editor>
        <p>
          <text>
            abc
            <anchor />
            def
          </text>
        </p>
        <code-block language="text">
          <code-line>
            <text>fghijk</text>
          </code-line>
          <code-line>
            <text>
              lmo
              <focus />
              pqr
            </text>
          </code-line>
          <code-line>
            <text>stuvwx</text>
          </code-line>
        </code-block>
        <p>
          <text>abcdef</text>
        </p>
      </editor>
    )

    const output = (
      <editor>
        <p>
          <text>abc</text>
          <text>
            <cursor />
            pqr
          </text>
        </p>
        <code-block language="text">
          <code-line>
            <text>stuvwx</text>
          </code-line>
        </code-block>
        <p>
          <text>abcdef</text>
        </p>
      </editor>
    )

    compare(input, output, (editor) => Transforms.delete(editor))
  })
})
