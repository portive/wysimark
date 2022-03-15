/** @jsx jsx  */
import { insertNestedBlock } from "~/editor/custom/insert/insert-nested-block"
import { RootBlockElement } from "~/editor/types"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("insertNestedBlock", () => {
  const code: RootBlockElement = {
    type: "code-block",
    language: "text",
    children: [{ type: "code-line", children: [{ text: "" }] }],
  }

  describe("insert nested block", () => {
    it("should insert code block at start of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <cursor />
              abc
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
          <p>
            <text>abc</text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert cocde block in middle of a paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <cursor />
              def
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
          <p>
            <text>def</text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block at end of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block in first empty paragraph and should put cursor in next paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block in second empty paragraph and should put cursor in next paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text />
          </p>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text />
          </p>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block in a blockquote", async () => {
      const input = (
        <editor>
          <blockquote>
            <p>
              <text>
                <cursor />
              </text>
            </p>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )

      const output = (
        <editor>
          <blockquote>
            <code-block language="text">
              <code-line>
                <text>
                  <cursor />
                </text>
              </code-line>
            </code-block>
          </blockquote>
          <p>
            <text />
          </p>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block in an img", async () => {
      const input = (
        <editor>
          <media url="url" alt="alt">
            <text>
              <cursor />
            </text>
          </media>
        </editor>
      )

      const output = (
        <editor>
          <media url="url" alt="alt">
            <text></text>
          </media>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })

    it("should insert code block in a code block", async () => {
      const input = (
        <editor>
          <code-block language="js">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      const output = (
        <editor>
          <code-block language="js">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
          <code-block language="text">
            <code-line>
              <text>
                <cursor />
              </text>
            </code-line>
          </code-block>
        </editor>
      )

      compare(input, output, (editor) => insertNestedBlock(editor, code))
    })
  })
})
