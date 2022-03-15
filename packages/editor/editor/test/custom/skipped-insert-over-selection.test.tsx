/** @jsx jsx  */
import * as Custom from "~/editor/custom"
import { RootBlockElement } from "~/editor/types"
import { compareWithoutNormalize as compare, jsx } from "../test-utils"

describe("Custom.insertRootBlock", () => {
  const hr: RootBlockElement = { type: "hr", children: [{ text: "" }] }

  describe.skip("expanded selection", () => {
    it("should insert hr over end of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <anchor />
              def
              <focus />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => Custom.insertVoidBlock(editor, hr))
    })

    it("should insert hr over start of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <anchor />
              abc
              <focus />
              def
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
              def
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => Custom.insertVoidBlock(editor, hr))
    })

    it("should insert hr over middle of paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              abc
              <anchor />
              def
              <focus />
              ghi
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <p>
            <text>abc</text>
          </p>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
              ghi
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => Custom.insertVoidBlock(editor, hr))
    })

    it.skip("should insert hr over entire paragraph", async () => {
      const input = (
        <editor>
          <p>
            <text>
              <anchor />
              abcdefghi
              <focus />
            </text>
          </p>
        </editor>
      )

      const output = (
        <editor>
          <hr>
            <text></text>
          </hr>
          <p>
            <text>
              <cursor />
            </text>
          </p>
        </editor>
      )

      compare(input, output, (editor) => Custom.insertVoidBlock(editor, hr))
    })
  })
})
